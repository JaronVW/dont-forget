import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User, UserSchema } from '../schemas/user.schema';
import { MongoClient } from 'mongodb';
import mongoose, { Connection, Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Todo, TodoSchema } from '../schemas/todo.schema';
import { TodosService } from '../todos/todos.service';

describe('UsersService', () => {
  let service: UsersService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let userModel: Model<User>;
  let user1;

  beforeAll(async () => {
    let uri: string;
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return { uri };
          },
        }),

        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();
    service = app.get<UsersService>(UsersService);
    userModel = app.get<Model<User>>(getModelToken(User.name));

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('users').deleteMany({});

    user1 = new userModel({
      username: 'test1',
      email: 'emailtaken@email.com',
      password: '1234aA!',
      dateCreated: new Date(),
    });

    await user1.save();
  });

  afterAll(async () => {
    await mongoc.close();
    await mongod.stop();
    await disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find user by username', () => {
    it('should find a user by username', async () => {
      const user = await service.findOneUser(user1.username);
      expect(user.username).toEqual(user1.username);
    });

    it('should return null if username is not found', async () => {
      const user = await service.findOneUser('notfound');
      expect(user).toBeNull();
    });
  });

  describe('Create user', () => {
    it('should create a user', async () => {
      const user = new userModel({
        username: 'test2',
        email: 'email2@email.com',
        password: '1234aA!',
        dateCreated: new Date(),
      });
      const createdUser = await service.createUser(user);
      expect(createdUser.username).toEqual(user.username);
    });

    it('should throw an error if email is already taken', async () => {
      const user = new userModel({
        username: 'test2',
        email: 'emailtaken@email.com',
        password: '1234aA!',
        dateCreated: new Date(),
      });
      await expect(service.createUser(user)).rejects.toThrow();
    });
  });
});
