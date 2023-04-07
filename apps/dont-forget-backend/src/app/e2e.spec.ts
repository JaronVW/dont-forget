import { INestApplication, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Neo4jModule } from './neo4j/neo4j.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { jwtConstants } from './auth/constants';
import { AppModule } from './app.module';
import { MongoClient } from 'mongodb';

import request = require('supertest');
import { AuthController } from './auth/auth.controller';
import { NotesModule } from './notes/notes.module';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
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
      username: 'neo4j',
      password: '1234aA!',
      database: 'e2etest',
    }),

    AuthModule,
    UsersModule,
    NotesModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class TestAppModule {}

describe.skip('end-to-end tests of data API', () => {
  let app: INestApplication;
  let module: TestingModule;
  let mongoc: MongoClient;
  let server;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    app.setGlobalPrefix('api');

    mongoc = new MongoClient(uri);
    await mongoc.connect();

    server = app.getHttpServer();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('users').deleteMany({});
    // empty neo4j database
  });

  afterAll(async () => {
    await app.close();
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should create a user', async () => {
    const result = await request(server).post('/auth/register').send({
      username: 'testtest',
      email: 'testmail@testmail.com',
      password: '1234aa!',
    });

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty('access_token');
  });

  it('should login a user', async () => {
    const reg = await request(server).post('/auth/register').send({
      username: 'testtest',
      email: 'testmail@testmail.com',
      password: '1234aa!',
    });
    const result = await request(server).post('/auth/login').send({
      username: 'testmail@testmail.com',
      password: '1234aa!',
    });
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty('access_token');
  });

  it('should not login a user with wrong password', async () => {
    const reg = await request(server).post('/auth/register').send({
      username: 'testtest',
      email: 'testmail@testmail.com',
      password: '1234aa!',
    });
    const result = await request(server).post('/auth/login').send({
      username: 'testmail@testmail.com',
      password: '2345aA!',
    });
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Unauthorized');
  });
});
