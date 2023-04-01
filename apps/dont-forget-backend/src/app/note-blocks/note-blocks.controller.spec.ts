import { Test, TestingModule } from '@nestjs/testing';
import { NoteBlocksController } from './note-blocks.controller';
import { NoteBlocksService } from './note-blocks.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  mockResult,
  mockNode,
  mockRelationship,
} from '../neo4j/neo4jMockObjects';

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
            shareNoteBlock: jest.fn(),
            removeShared: jest.fn(),
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
        title: 'title',
        description: 'description',
        dateCreated: new Date(),
        notes: [],
      };

      const getNoteBlock = jest
        .spyOn(noteBlocksService, 'findOne')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => exampleNoteBlock);

      const result = await controller.findOne(
        {
          userId: 'id123',
        },
        'id123'
      );

      expect(getNoteBlock).toBeCalledTimes(1);
      expect(getNoteBlock).toBeCalledWith('id123', 'id123');
      expect(result).toStrictEqual(exampleNoteBlock);
    });

    describe('shareNoteBlock', () => {
      it('calls share noteblock on the service', async () => {
        const data = {
          mongoId: '6419e36ed9d21671647ddd1e',
          username: 'testuser',
        };

        const makeNoteBlockNode = jest
          .spyOn(neo4jService, 'write')

          .mockResolvedValue(
            mockResult([
              {
                b: mockNode('NoteBlock', { ...data, id: 'id123' }),
              },
            ])
          );

        jest.spyOn(neo4jService, 'write').mockResolvedValue(
          mockResult([
            {
              b: mockRelationship('NoteBlock', { ...data, id: 'id123' }),
            },
          ])
        );
        const result = await controller.shareNoteBlock('id123', '');
        expect(makeNoteBlockNode).toBeCalledTimes(2);
        expect(result).toStrictEqual({
          StatusCode: 200,
          message: 'NoteBlock shared',
        });
      });

      it('throws a Conflict exception ', async () => {
        jest
          .spyOn(neo4jService, 'write')
          .mockRejectedValue(new Error('already exists'));
        await expect(
          controller.shareNoteBlock('id123', '')
        ).rejects.toThrowError(ConflictException);
      });

      it('throws a not found exception ', async () => {
        jest
          .spyOn(neo4jService, 'write')
          .mockRejectedValue(new Error('Not found'));
        await expect(
          controller.shareNoteBlock('id123', '')
        ).rejects.toThrowError(NotFoundException);
      });
    });
  });

  describe('deleteShared', () => {
    it('calls delete shared on the service', async () => {
      const data = {
        mongoId: '6419e36ed9d21671647ddd1e',
        username: 'testuser',
      };

      const makeNoteBlockNode = jest
        .spyOn(neo4jService, 'write')

        .mockResolvedValue(
          mockResult([
            {
              b: mockNode('NoteBlock', { ...data, id: 'id123' }),
            },
          ])
        );
      const result = await controller.removeShared({ userId: 'id123' }, '');
      expect(makeNoteBlockNode).toBeCalledTimes(1);
      expect(result).toStrictEqual({
        StatusCode: 200,
        message: 'Shared noteblock deleted',
      });
    });

    it('throws a not found exception ', async () => {
      jest
        .spyOn(neo4jService, 'write')
        .mockRejectedValue(new Error('Not found'));
      await expect(controller.shareNoteBlock('id123', '')).rejects.toThrowError(
        NotFoundException
      );
    });
  });
});
