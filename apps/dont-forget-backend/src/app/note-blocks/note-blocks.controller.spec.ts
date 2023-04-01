import { Test, TestingModule } from '@nestjs/testing';
import { NoteBlocksController } from './note-blocks.controller';
import { NoteBlocksService } from './note-blocks.service';
import { Neo4jService } from '../neo4j/neo4j.service';

jest.mock('neo4j-driver/lib/driver');

describe.skip('NoteBlocksController', () => {
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

  describe('getNoteBlocks', () => {
    it('calls FindAll on the service', async () => {
      const getNoteBlocks = jest
        .spyOn(noteBlocksService, 'findAll')
        .mockImplementation(async () => []);

      const result = await controller.findAll({
        userId: 'id123',
      });

      expect(getNoteBlocks).toBeCalledTimes(1);
      expect(getNoteBlocks).toBeCalledWith('id123');
      expect(result).toStrictEqual([]);
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
