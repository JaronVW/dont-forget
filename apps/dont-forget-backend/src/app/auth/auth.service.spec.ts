import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { Model, disconnect } from 'mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

jest.mock('neo4j-driver/lib/driver');

describe('AuthService', () => {
  let service: AuthService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let userModel: Model<User>;
  let jwtService: JwtService;
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
        JwtModule,
      ],
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();
    service = app.get<AuthService>(AuthService);
    jwtService = app.get<JwtService>(JwtService);

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

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  it('should register a user', async () => {
    jest.spyOn(jwtService, 'sign').mockImplementation(() => 'token');

    const user = await service.register({
      username: 'John Doe',
      email: 'mock@email.com',
      password: 'password',
    });
    expect(user).toBeDefined();
  });

  it('should login a user', async () => {
    jest.spyOn(jwtService, 'sign').mockImplementation(() => 'token');

    const user = await service.login({
      username: 'John Doe',
      email: 'mock@email.com',
      _id: '123',
    });
    expect(user).toBeDefined();
  });
});
