import { NotesService } from './notes.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, disconnect } from 'mongoose';
import { MongoClient } from 'mongodb';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Note, NoteSchema } from '../schemas/note.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('NotesService', () => {
  let service: NotesService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let noteModel: Model<Note>;
  let userModel: Model<User>;

  let createNote, note1, note2, note3;
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

        MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [NotesService],
    }).compile();
    service = app.get<NotesService>(NotesService);

    noteModel = app.get<Model<Note>>(getModelToken(Note.name));
    userModel = app.get<Model<User>>(getModelToken(User.name));

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });


  beforeEach(async () => {
    // await mongoc.db('test').collection('notes').deleteMany({}); // TODO not emptying the collection works?
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

    createNote = new noteModel({
      id: '5f9f1b5b9b1b9c0b1c8c1c1b',
      title: 'test',
      text: 'test',
      dateCreated: new Date(),
    });

    note1 = new noteModel({
      id: '5f9f1b5b9b1b9c0b1c8c1c1c',
      title: 'test1',
      text: 'test1',
      dateCreated: new Date(),
      userRef: user1._id,
    });

    note2 = new noteModel({
      id: '5f9f1b5b9b1b9c0b1c8c1c1d',
      title: 'test2',
      text: 'test2',
      dateCreated: new Date(),
      userRef: user1._id,
    });

    note3 = new noteModel({
      id: '5f9f1b5b9b1b9c0b1c8c1c1e',
      title: 'test3',
      text: 'test3',
      dateCreated: new Date(),
      userRef: user3._id,
    });

    await user1.save();
    await user2.save();
    await user3.save();

    await note1.save();
    await note2.save();
    await note3.save();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNote', () => {
    it('should create a note', async () => {
      const note = await service.create(user1._id, createNote);
      expect(note).toBeDefined();
      expect(note).toEqual(createNote);
      expect(String(note.userRef)).toEqual(user1.id);
    });

    it('should throw an error', async () => {
      await expect(service.create(user1.id, null)).rejects.toThrowError(
        BadRequestException
      );
    });
  });

  describe('getNotes', () => {
    it('should return all notes', async () => {
      const notes = await service.findAll(user1.id);
      expect(notes).toBeInstanceOf(Array);

      expect(notes.length).toBeGreaterThan(0);
      expect(notes[0].title).toEqual(String(note1.title));
    });

    it('should return an empty array', async () => {
      const result = await service.findAll(user2.id);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(0);
    });
  });

  describe('getNote', () => {
    it('should return a note', async () => {
      const note = await service.findOne(note1.id, user1.id);
      expect(note).toBeDefined();
      expect(note.title).toEqual(note1.title);
    });

    it('should return null', async () => {
      const note = await service.findOne('641f0fea638288bd31ecd971', note3.id);
      expect(note).toBeNull();
    });
  });

  describe('updateNote', () => {
    it('should update a note', async () => {
      const note = await service.update(note1.id, user1.id, {
        title: 'new title',
        text: 'new text',
        dateCreated: new Date(),
      });
      expect(note).toBeDefined();
      expect(note.title).toEqual('new title');
      expect(note.text).toEqual('new text');
    });

    it('should return a bad request', async () => {
      await expect(service.update(user1.id, note1._id, null)).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteNote', () => {
    it('should delete a note', async () => {
      const result = await service.remove(note1.id, user1.id);
      
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
