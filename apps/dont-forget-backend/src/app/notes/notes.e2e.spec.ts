import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication, Module } from '@nestjs/common';
import { NotesModule } from './notes.module';
import * as request from 'supertest';
import { NotesService } from './notes.service';
import { disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const notesService = { findAll: () => ['test'] };

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
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class TestAppModule {}

describe('NotesController (e2e)', () => {
  let app: INestApplication;
  const notesService = { findAll: () => ['test'] };
  let server;
  let mongoc: MongoClient;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestAppModule],
    })
      .overrideProvider(NotesService)
      .useValue(notesService)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            userId: '5f9f1c1b9c9d2b2b8c8c1c1c',
          };
          return true;
        },
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
    return request(app.getHttpServer()).get('/notes').expect('Hello World!');
  });
});
