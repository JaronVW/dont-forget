import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { TodosService } from '../todos/todos.service';
import { BadRequestException, Controller } from '@nestjs/common';

describe('NotesController', () => {
  let app: TestingModule;
  let controller: NotesController;
  let notesService: NotesService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<NotesController>(NotesController);
    notesService = app.get<NotesService>(NotesService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNotes', () => {
    it('calls FindAll on the service', async () => {
      const getNotes = jest
        .spyOn(notesService, 'findAll')
        .mockImplementation(async () => []);

      const result = await controller.findAll({
        userId: 'id123',
      });

      expect(getNotes).toBeCalledTimes(1);
      expect(getNotes).toBeCalledWith('id123');
      expect(result).toStrictEqual([]);
    });

    it('calls findOne on the service', async () => {
      const exampleNote = {
        id: 'id123',
        title: 'title',
        text: 'text',
        dateCreated: new Date(),
      };

      const getNote = jest
        .spyOn(notesService, 'findOne')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => exampleNote);

      const result = await controller.findOne(
        {
          userId: 'id123',
        },
        'id123'
      );

      expect(getNote).toBeCalledTimes(1);
      expect(getNote).toBeCalledWith('id123', 'id123');
      expect(result).toStrictEqual(exampleNote);
    });
  });

  describe('createNote', () => {
    it('calls create on the service', async () => {
      const exampleNote = {
        id: 'id123',
        title: 'title',
        text: 'text',
        dateCreated: new Date(),
      };

      const createNote = jest
        .spyOn(notesService, 'create')
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
      const exampleNote = {
        id: 'id123',
        title: 'title',
        text: 'text',
        dateCreated: new Date(),
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
        exampleNote
      );

      expect(updateNote).toBeCalledTimes(1);
      expect(updateNote).toBeCalledWith('id123', 'id123', exampleNote);
      expect(result).toStrictEqual(exampleNote);
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
