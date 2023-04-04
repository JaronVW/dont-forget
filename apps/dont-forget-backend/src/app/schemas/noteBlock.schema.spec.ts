import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import {
  NoteBlock,
  NoteBlockSchema,
  NoteBlockDocument,
} from './noteBlock.schema';

describe('NoteBlockSchema', () => {
  let noteBlockModel: Model<NoteBlockDocument>;
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
        MongooseModule.forFeature([
          { name: NoteBlock.name, schema: NoteBlockSchema },
        ]),
      ],
    }).compile();

    noteBlockModel = app.get<Model<NoteBlockDocument>>(
      getModelToken(NoteBlock.name)
    );

    await noteBlockModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(noteBlockModel).toBeDefined();
  });

  it('should create a noteBlock', async () => {
    const noteBlock = new noteBlockModel({
      title: 'Test NoteBlock',
      description: 'This is a test noteBlock',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
    });
    await noteBlock.save();
    expect(noteBlock._id).toBeDefined();
    expect(noteBlock.title).toBe('Test NoteBlock');
    expect(noteBlock.description).toBe('This is a test noteBlock');
  });

  it('has a default dateCreated', async () => {
    const noteBlock = new noteBlockModel({
      title: 'Test NoteBlock',
      description: 'This is a test noteBlock',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
    });
    await noteBlock.save();
    expect(noteBlock.dateCreated).toBeDefined();
  });

  it('creates a noteBlock with notes', async () => {
    const noteBlock = new noteBlockModel({
      title: 'Test NoteBlock',
      description: 'This is a test noteBlock',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',

      notes: ['60f1b5b0b9b1a8a0b0b0b0b0'],
    });
    await noteBlock.save();
    expect(noteBlock.notes).toBeDefined();
    expect(noteBlock.notes.length).toBe(1);
  });

  it('should throw an error if no title is provided', async () => {
    const noteBlock = new noteBlockModel({
      description: 'This is a test noteBlock',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
    });
    await expect(noteBlock.save()).rejects.toThrow();
  });

  it('should throw an error if no description is provided', async () => {
    const noteBlock = new noteBlockModel({
      title: 'Test NoteBlock',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
    });
    await expect(noteBlock.save()).rejects.toThrow();
  });

  it('should throw an error if no userRef is provided', async () => {
    const noteBlock = new noteBlockModel({
      title: 'Test NoteBlock',
      description: 'This is a test noteBlock',
    });
    await expect(noteBlock.save()).rejects.toThrow();
  });
  
});
