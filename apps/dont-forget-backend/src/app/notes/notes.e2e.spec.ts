import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication, Module } from '@nestjs/common';
import { NotesModule } from './notes.module';
import * as request from 'supertest';
import { NotesService } from './notes.service';
import { Model, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Note, NoteSchema } from '../schemas/note.schema';
import { User, UserSchema } from '../schemas/user.schema';

let mongod: MongoMemoryServer;
let uri: string;

let testNote1, testNote2, testNote3;
let testUser, testUser2;

describe('end-to-end tests of data API', () => {
  let app: INestApplication;
  let server;
  let module: TestingModule;
  let mongoc: MongoClient;

  let noteModel: Model<Note>;
  let userModel: Model<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        NotesModule,
      ],
      controllers: [],
      providers: [],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            userId: '63f4ce429dd69089ef4dc1bc',
          };
          return true;
        },
      })
      .compile();

    noteModel = module.get<Model<Note>>(getModelToken(Note.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));

    app = module.createNestApplication();
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

  beforeEach(async () => {
    await mongoc.db('test').collection('notes').deleteMany({});

    const dateConst = new Date();

    testUser = new userModel({
      _id: '63f4ce429dd69089ef4dc1bc',
      username: 'username',
      password: '1234aA!',
      email: 'email@email.com',
    });

    testUser2 = new userModel({
      _id: '63f4ce429dd69089ef4dc1bd',
      username: 'username2',
      password: '1234aA!',
      email: 'myemail@email.com',
    });

    testNote1 = new noteModel({
      userRef: '63f4ce429dd69089ef4dc1bc',
      id: '642fd8eef35714fc6e999f3a',
      title: 'title1',
      text: 'text1',
      dateCreated: '2021-08-02T14:53:10.000Z',
    });

    testNote2 = new noteModel({
      userRef: '63f4ce429dd69089ef4dc1bc',
      id: '642fd8eef35714fc6e999f3b',
      title: 'title2',
      text: 'text2',
      dateCreated: '2021-08-02T14:53:10.000Z',
    });

    testNote3 = new noteModel({
      userRef: '63f4ce429dd69089ef4dc1bd',
      id: '642fd8eef35714fc6e999f3c',
      title: 'title3',
      text: 'text3',
      dateCreated: '2021-08-02T14:53:10.000Z',
    });

    await testUser.save();
    await testUser2.save();
    await testNote1.save();
    await testNote2.save();
  });

  it('should return a list of notes', async () => {
    const response = await request(server).get('/notes');
    expect(response.status).toBe(200);

    expect(response.body[0].title).toEqual('title1');
    expect(response.body[0].text).toEqual('text1');
    expect(response.body[0].dateCreated).toEqual('2021-08-02T14:53:10.000Z');
    expect(response.body[1].title).toEqual('title2');
    expect(response.body[1].text).toEqual('text2');
    expect(response.body[1].dateCreated).toEqual('2021-08-02T14:53:10.000Z');
  });
});
