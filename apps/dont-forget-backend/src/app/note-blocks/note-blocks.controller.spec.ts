import { Test, TestingModule } from '@nestjs/testing';
import { NoteBlocksController } from './note-blocks.controller';
import { NoteBlocksService } from './note-blocks.service';
import { Neo4jService } from '../neo4j/neo4j.service';

jest.mock('neo4j-driver/lib/driver');

describe('NoteBlocksController', () => {
  let app: TestingModule;
  let controller: NoteBlocksController;
  let noteBlocksService: NoteBlocksService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [NoteBlocksController],
      providers: [
        {
          provide: NoteBlocksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: Neo4jService,
          useValue: {
            write: jest.fn(),
            read: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<NoteBlocksController>(NoteBlocksController);
    noteBlocksService = app.get<NoteBlocksService>(NoteBlocksService);
    neo4jService = app.get<Neo4jService>(Neo4jService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNoteBlocks', () => {
    it('calls FindAll on the service', async () => {
      const testDate = new Date();
      const getNoteBlocks = jest
        .spyOn(noteBlocksService, 'findAll')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => [
          {
            id: 'id123',
            userId: 'id123',
            title: 'title',
            description: 'description',
            dueDate: testDate,
          },
        ]);

      const result = await controller.findAll({
        userId: 'id123',
      });

      expect(getNoteBlocks).toBeCalledTimes(1);
      expect(getNoteBlocks).toBeCalledWith('id123');
      expect(result).toStrictEqual([
        {
          id: 'id123',
          userId: 'id123',
          title: 'title',
          description: 'description',
          dueDate: testDate,
        },
      ]);
    });

    it('calls findOne on the service', async () => {
      const exampleNoteBlock = {
        id: 'id123',
        userId: 'id123',
        title: 'title',
        description: 'description',
        dueDate: new Date(),
      };

      const getNoteBlock = jest
        .spyOn(noteBlocksService, 'findOne')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => exampleNoteBlock);

      const result = await controller.findOne('id123', 'id123');

      expect(getNoteBlock).toBeCalledTimes(1);
      expect(getNoteBlock).toBeCalledWith('id123', 'id123');
      expect(result).toStrictEqual(exampleNoteBlock);
    });
  });

  describe('createNote', () => {
    it('calls create on the service', async () => {
      const exampleNoteBlock = {
        id: 'id123',
        userId: 'id123',
        title: 'title',
        description: 'description',
        dueDate: new Date(),
      };

      const createNote = jest
        .spyOn(noteBlocksService, 'create')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => exampleNote);

      const result = await controller.create(
        {
          userId: 'id123',
        },
        exampleNote
      );

      expect(createNote).toBeCalledTimes(1);
      expect(createNote).toBeCalledWith('id123', exampleNote);
      expect(result).toStrictEqual(exampleNote);
    });

    it('throws a bad request if title is missing', async () => {
      const create = jest
        .spyOn(notesService, 'create')
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .mockImplementation(async () => {
          throw new BadRequestException();
        });
      await expect(
        controller.create(
          { userId: 'id123' },
          {
            title: '',
            text: 'text',
            dateCreated: new Date(),
          }
        )
      ).rejects.toThrow(BadRequestException);

      expect(create).toBeCalledTimes(1);
    });

    it('throws a bad request if text is missing', async () => {
      const create = jest
        .spyOn(notesService, 'create')
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .mockImplementation(async () => {
          throw new BadRequestException();
        });

      await expect(
        controller.create(
          { userId: 'id123' },
          {
            title: '',
            text: 'text',
            dateCreated: new Date(),
          }
        )
      ).rejects.toThrow(BadRequestException);

      expect(create).toBeCalledTimes(1);
    });
  });

  describe('updateNote', () => {
    it('calls update on the service', async () => {
      const exampleNoteBlock = {
        id: 'id123',
        userId: 'id123',
        title: 'title',
        description: 'description',
        dueDate: new Date(),
      };

      const updateNote = jest
        .spyOn(notesService, 'update')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => exampleNote);

      const result = await controller.update(
        {
          userId: 'id123',
        },
        'id123',
        exampleNoteBlock
      );

      expect(updateNote).toBeCalledTimes(1);
      expect(updateNote).toBeCalledWith('id123', 'id123', exampleNoteBlock);
      expect(result).toStrictEqual(exampleNoteBlock);
    });
  });

  describe('deleteNote', () => {
    it('calls remove on the service', async () => {
      const exampleNote = {
        id: 'id123',
        title: 'title',
        text: 'text',
        dateCreated: new Date(),
      };

      const removeNote = jest
        .spyOn(notesService, 'remove')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => exampleNote);

      const result = await controller.remove('id123', {
        userId: 'id123',
      });

      expect(removeNote).toBeCalledTimes(1);
      expect(removeNote).toBeCalledWith('id123', 'id123');
      expect(result).toStrictEqual(exampleNote);
    });
  });
});
