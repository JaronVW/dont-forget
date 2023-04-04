import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication, Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import * as request from 'supertest';
import { AuthService } from './auth.service';
import { disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';

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
    AuthModule,
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '2700s' },
    }),
  ],
  controllers: [],
  providers: [LocalStrategy, JwtStrategy],
})
export class TestAppModule {}

describe('NotesController (e2e)', () => {
  let app: INestApplication;
  const dateConst = new Date().toISOString();
  const authService = {
    findAll: (userId) => [
      {
        userId,
        id: 'id123',
        title: 'title',
        text: 'text',
        dateCreated: dateConst,
      },
    ],
  };
  let server;
  let mongoc: MongoClient;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestAppModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request.user = { userId: '5f9f1c1b9c9d2b2b8c8c1c1c' };
          return true;
        },
      })
      .overrideGuard(LocalAuthGuard)
      .useValue({
      
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    mongoc = new MongoClient(uri);
    await mongoc.connect();

    server = app.getHttpServer();
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect(authService.findAll('5f9f1c1b9c9d2b2b8c8c1c1c'));
  });
});
