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
  const dateConst = new Date().toISOString();
  const notesService = {
    findAll: (userId) => [
      {
        userId,
        id: 'id123',
        title: 'title',
        text: 'text',
        dateCreated: dateConst,
      },
    ],

    findOne: (id) => ({
      id: 'id123',
      title: 'title',
      text: 'text',
      dateCreated: dateConst,
    }),

    create: (userId, { title, text }) => ({
      id: 'id123',
      title,
      text,
      dateCreated: dateConst,
    }),

    update: (userId, { title, text }) => ({
      id: 'id123',
      title,
      text,
      dateCreated: dateConst,
    }),

    remove: (userId, id) => ({
      userId: '',
      id: 'id123',
      title: 'title',
      text: 'text',
      dateCreated: dateConst,
    }),
  };
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
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect(notesService.findAll('5f9f1c1b9c9d2b2b8c8c1c1c'));
  });
  it('/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/notes/id123')
      .expect(200)
      .expect(notesService.findOne('5f9f1c1b9c9d2b2b8c8c1c1c'));
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/notes')
      .send({
        title: 'title',
        text: 'text',
      })
      .expect(201)
      .expect(
        notesService.create('5f9f1c1b9c9d2b2b8c8c1c1c', {
          title: 'title',
          text: 'text',
        })
      );
  });

  it('/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/notes/id123')
      .send({
        title: 'title',
        text: 'text',
      })
      .expect(200)
      .expect(
        notesService.update('5f9f1c1b9c9d2b2b8c8c1c1c', {
          title: 'title',
          text: 'text',
        })
      );
  });

  it('/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/notes/id123')
      .expect(200)
      .expect(
        notesService.remove('5f9f1c1b9c9d2b2b8c8c1c1c', {
          title: 'title',
          text: 'text',
        })
      );
  });
});
