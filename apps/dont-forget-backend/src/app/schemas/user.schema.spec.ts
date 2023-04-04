// user schema unit tests setup:

import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { User, UserDocument, UserSchema } from './user.schema';

describe('User Schema', () => {
  let mongod: MongoMemoryServer;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
    }).compile();

    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

    // not entirely sure why we need to wait for this...
    // https://github.com/nodkz/mongodb-memory-server/issues/102
    await userModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });

  it('should create a user', async () => {
    const user = new userModel({
      email: 'email@email.com',
      username: 'Test User',
      password: '1234aA!',
    });
    await user.save();
    expect(user._id).toBeDefined();
    expect(user.email).toBe('email@email.com');
    expect(user.username).toBe('Test User');
    expect(user.password).toBe('1234aA!');
  });

  it('should create a user with a dateCreated', async () => {
    const user = new userModel({
      email: 'email@email.com',
      username: 'Test User',
      password: '1234aA!',
      dateCreated: new Date(),
    });
    await user.save();
    expect(user._id).toBeDefined();
    expect(user.email).toBe('email@email.com');
    expect(user.username).toBe('Test User');
    expect(user.password).toBe('1234aA!');
    expect(user.dateCreated).toBeDefined();
  });

  it('should throw an error if the email is not unique', async () => {
    const user = new userModel({
      email: 'email@email.com',
      username: 'Test User',
      password: '1234aA!',
    });
    await user.save();
    const user2 = new userModel({
      email: 'email@email.com',
      username: 'Test User',
      password: '1234aA!',
    });
    await expect(user2.save()).rejects.toThrow();
  });

  it('should throw an error if the username is not unique', async () => {
    const user = new userModel({
      email: 'email@email.com',
      username: 'Test User',
      password: '1234aA!',
    });

    await user.save();
    const user2 = new userModel({
      email: 'email@email.com',
      username: 'Test User',
      password: '1234aA!',
    });

    await expect(user2.save()).rejects.toThrow();
  });

  it('should throw an error if the email is not valid', async () => {
    const user = new userModel({
      email: 'email',
      username: 'Test User',
      password: '1234aA!',
    });

    await expect(user.save()).rejects.toThrow();
  });

  it('should throw an error if the password is not valid', async () => {
    const user = new userModel({
      email: 'email',
      username: 'Test User',
      password: 'pa',
    });

    await expect(user.save()).rejects.toThrow();
  });
});
