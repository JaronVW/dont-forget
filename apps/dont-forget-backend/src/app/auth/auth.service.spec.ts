import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { Model, disconnect } from 'mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { Neo4jService } from '../neo4j/neo4j.service';
import { UsersService } from '../users/users.service';

jest.mock('neo4j-driver/lib/driver');

describe('AuthService', () => {
  let service: AuthService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let userModel: Model<User>;
  let user1;
  let neo4jService: Neo4jService;

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
        Neo4jModule.forRoot({
          scheme: 'neo4j',
          host: 'localhost',
          database: '',
          username: 'neo4j',
          password: 'neox',
        }),
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AuthService, UsersService],
    }).compile();
    service = app.get<AuthService>(AuthService);
    neo4jService = app.get(Neo4jService);

    userModel = app.get<Model<User>>(getModelToken(User.name));

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('users').deleteMany({});
    user1 = new userModel({
      username: 'test1',
      email: 'test@email.com',
      password: 'password',
      dateCreated: new Date(),
    });

    await user1.save();
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const user = await service.register({
      username: 'John Doe',
      email: 'mock@email.com',
      password: 'password',
    });
    expect(user).toBeDefined();
  });
});
