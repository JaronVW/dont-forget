import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, disconnect } from 'mongoose';
import { Todo, TodoSchema } from '../schemas/todo.schema';
import { MongoClient } from 'mongodb';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

describe('AccountService', () => {
  let service: AccountService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let userModel: Model<User>;
  let user1, user2, user3;

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
      providers: [AccountService],
    }).compile();
    service = app.get<AccountService>(AccountService);

    userModel = app.get<Model<User>>(getModelToken(User.name));

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('todos').deleteMany({});
    await mongoc.db('test').collection('users').deleteMany({});

    user1 = new userModel({
      username: 'test1',
      email: 'emaila@email.com',
      password: 'password',
      dateCreated: new Date(),
    });

    user2 = new userModel({
      username: 'test2',
      email: 'email2@email.com',
      password: 'password',
      dateCreated: new Date(),
    });

    user3 = new userModel({
      username: 'test3',
      email: 'email3@email.com',
      password: 'password',
      dateCreated: new Date(),
    });

    await user1.save();
    await user2.save();
    await user3.save();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  describe('getFollowing', () => {
    it('should return the following users', async () => {
      const followingIds = [user1._id, user2._id];
      const following = await service.getUsersList(followingIds);
      expect(following).toBeDefined();
      expect(following).toHaveLength(2);
      expect(following[0].username).toEqual(user1.username);
      expect(following[1].username).toEqual(user2.username);
    });

    it('should return an empty array if there are no users passed', async () => {
      const followingIds = [];
      const following = await service.getUsersList(followingIds);
      expect(following).toBeDefined();
      expect(following).toBeInstanceOf(Array);
      expect(following).toHaveLength(0);
    });

    it('should return an empty array if objectId is unknown', async () => {
      const followingIds = ['5f6c9a9a2c8e2a2d1c6b1f1b'];
      const following = await service.getUsersList(followingIds);
      expect(following).toBeDefined();
      expect(following).toBeInstanceOf(Array);
      expect(following).toHaveLength(0);
    });
  });
});
