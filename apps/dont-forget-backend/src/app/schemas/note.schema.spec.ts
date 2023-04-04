import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Note, NoteSchema, NoteDocument } from './note.schema';

describe('NoteSchema', () => {
  let noteModel: Model<NoteDocument>;
  let mongod = new MongoMemoryServer();

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
        MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
      ],
    }).compile();

    noteModel = app.get<Model<NoteDocument>>(getModelToken(Note.name));

    // not entirely sure why we need to wait for this...
    // https://github.com/nodkz/mongodb-memory-server/issues/102
    await noteModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(noteModel).toBeDefined();
  });

  it('should create a note', async () => {
    const note = new noteModel({
      title: 'Test Note',
      text: 'This is a test note',
    });
    await note.save();
    expect(note._id).toBeDefined();
    expect(note.title).toBe('Test Note');
    expect(note.text).toBe('This is a test note');
  });

  it('has a default dateCreated', async () => {
    const note = new noteModel({
      title: 'Test Note',
      text: 'This is a test note',
    });
    await note.save();
    expect(note.dateCreated).toBeDefined();
  });

  it('should create a note with a dateCreated', async () => {
    const note = new noteModel({
      title: 'Test Note',
      text: 'This is a test note',
      dateCreated: new Date('2020-07-20T00:00:00.000Z'),
    });
    await note.save();
    expect(note._id).toBeDefined();
    expect(note.title).toBe('Test Note');
    expect(note.text).toBe('This is a test note');
    expect(note.dateCreated).toEqual(new Date('2020-07-20T00:00:00.000Z'));
  });

  it('should create a note with a userRef', async () => {
    const note = new noteModel({
      title: 'Test Note',
      text: 'This is a test note',
      userRef: '5f1d7b1f2d2d2e3b9c3b3d4c',
    });
    await note.save();
    expect(note._id).toBeDefined();
    expect(note.title).toBe('Test Note');
    expect(note.text).toBe('This is a test note');
    expect(String(note.userRef)).toBe('5f1d7b1f2d2d2e3b9c3b3d4c');
  });

  it('should throw an error if title is not provided', async () => {
    const note = new noteModel({
      text: 'This is a test note',
    });
    await expect(note.save()).rejects.toThrowError();
  });

  it('should throw an error if text is not provided', async () => {
    const note = new noteModel({
      title: 'Test Note',
    });
    await expect(note.save()).rejects.toThrowError();
  });
});
