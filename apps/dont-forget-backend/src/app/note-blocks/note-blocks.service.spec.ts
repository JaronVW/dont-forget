import { Test, TestingModule } from '@nestjs/testing';
import { NoteBlocksService } from './note-blocks.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import mongoose, { Connection, Model, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Todo, TodoSchema } from '../schemas/todo.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { NoteBlock, NoteBlockSchema } from '../schemas/noteBlock.schema';
import { Note, NoteSchema } from '../schemas/note.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('NoteBlocksService', () => {
  let service: NoteBlocksService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let noteBlockModel: Model<NoteBlock>;
  let userModel: Model<User>;
  let createNB, NB1, NB2, NB3;
  let user1, user2, user3;

  beforeAll(async () => {
    let uri: string;
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([
          { name: NoteBlock.name, schema: NoteBlockSchema },
        ]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
      ],
      providers: [NoteBlocksService],
    }).compile();

    service = module.get<NoteBlocksService>(NoteBlocksService);

    noteBlockModel = module.get<Model<NoteBlock>>(
      getModelToken(NoteBlock.name)
    );
    userModel = module.get<Model<User>>(getModelToken(User.name));

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    // await mongoc.db('test').collection('noteblocks').deleteMany({}); // TODO not emptying the collection works?
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

    createNB = new noteBlockModel({
      title: 'title',
      description: 'description',
      dateCreated: new Date(),
      notes: [],
      userRef: user1._id,
    });

    NB1 = new noteBlockModel({
      id: '5f9f1b9b9b9b9b9b9b9b9b9b',
      title: 'title1',
      description: 'description1',
      dateCreated: new Date(),
      notes: [],
      userRef: user1._id,
    });

    NB2 = new noteBlockModel({
      id: '5f9f1b9b9b9b9b9b9b9b9b9c',
      title: 'title2',
      description: 'description2',
      dateCreated: new Date(),
      notes: [],
      userRef: user2._id,
    });

    NB3 = new noteBlockModel({
      id: '5f9f1b9b9b9b9b9b9b9b9b9d',
      title: 'title3',
      description: 'description3',
      dateCreated: new Date(),
      notes: [],
      userRef: user3._id,
    });

    await NB1.save();
    await NB2.save();
    await NB3.save();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNoteBlock', () => {
    it('should create a note block', async () => {
      const result = await service.create(user1.id, createNB);
      expect(result).toBeDefined();
      expect(result).toEqual(createNB);
      expect(String(result.userRef)).toEqual(user1.id);
    });

    it('should throw an error', async () => {
      await expect(service.create(user1.id, null)).rejects.toThrow();
    });
  });

  describe('find NoteBlocks', () => {
    it('should return all note blocks', async () => {
      const result = await service.findAll(user1.id);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return a note block', async () => {
      const result = await service.findOne(NB1.id, user1.id);
      expect(result).toBeDefined();
      expect(String(result.userRef)).toEqual(user1.id);
    });
  });

  describe('update NoteBlocks', () => {
    it('should update a note block', async () => {
      const result = await service.update(
        NB1.id,
        {
          title: 'updated title',
          dateCreated: new Date(),
          notes: [],
          userRef: user1._id,
          description: 'updated description',
        },
        user1.id
      );
      expect(result).toBeDefined();
      expect(result.title).toEqual('updated title');
      expect(result.description).toEqual('updated description');
      expect(String(result.userRef)).toEqual(user1.id);
    });

    it('should throw an error', async () => {
      await expect(service.update(NB1.id, null, user1.id)).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete NoteBlock', () => {
    it('should delete a noteBlock', async () => {
      const result = await service.remove(NB1.id, user1.id);
      expect(result).toBeDefined();
      expect(String(result.userRef)).toEqual(user1.id);
    });

    it('should throw an error', async () => {
      await expect(
        service.remove('641f0fea638288bd31ecd971', user1.id)
      ).rejects.toThrow(NotFoundException);
    });
  });
});
