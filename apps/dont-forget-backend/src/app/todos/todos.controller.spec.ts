import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let app: TestingModule;
  let controller: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
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

    controller = app.get<TodosController>(TodosController);
    todosService = app.get<TodosService>(TodosService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTodos', () => {
    it('calls FindAll on the service', async () => {
      const getTodos = jest
        .spyOn(todosService, 'findAll')
        .mockImplementation(async () => []);

      const result = await controller.findAll({
        userId: 'id123',
      });

      expect(getTodos).toBeCalledTimes(1);
      expect(getTodos).toBeCalledWith('id123');
      expect(result).toStrictEqual([]);
    });

    it('calls findOne on the service', async () => {
      const exampleTodo = {
        id: 'id123',
        userId: 'id123',
        title: 'title',
        description: 'description',
        dueDate: new Date(),
        dateCreated: new Date(),
        completed: false,
        tasks: [],
        numberOfTasks: 0,
      };

      const getTodo = jest
        .spyOn(todosService, 'findOne')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => exampleTodo);

      const result = await controller.findOne(
        {
          userId: 'id123',
        },
        'id123'
      );

      expect(getTodo).toBeCalledTimes(1);
      expect(getTodo).toBeCalledWith('id123', 'id123');
      expect(result).toStrictEqual(exampleTodo);
    });
  });

  describe('createTodo', () => {
    it('calls create on the service', async () => {
      const exampleTodo = {
        userRef: 'id123',
        title: 'title',
        description: 'description',
        dueDate: new Date(),
        dateCreated: new Date(),
        completed: false,
        tasks: [],
        numberOfTasks: 0,
      };

      const createTodo = jest
        .spyOn(todosService, 'create')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => exampleTodo);

      const result = await controller.create(
        {
          userId: 'id123',
        },
        exampleTodo
      );

      expect(createTodo).toBeCalledTimes(1);
      expect(createTodo).toBeCalledWith('id123', exampleTodo);
      expect(result).toStrictEqual(exampleTodo);
    });
  });

  describe('updateTodo', () => {
    it('calls update on the service', async () => {
      const exampleTodo = {
        id: 'id123',
        userRef: 'id123',
        title: 'title',
        description: 'description',
        dueDate: new Date(),
        dateCreated: new Date(),
        completed: false,
        tasks: [],
        numberOfTasks: 0,
      };

      const updateTodo = jest
        .spyOn(todosService, 'update')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => exampleTodo);

      const result = await controller.update(
        {
          userId: 'id123',
        },
        'id123',
        exampleTodo
      );

      expect(updateTodo).toBeCalledTimes(1);
      expect(updateTodo).toBeCalledWith('id123', 'id123', exampleTodo);
      expect(result).toStrictEqual(exampleTodo);
    });
  });

  describe('deleteTodo', () => {
    it('calls remove on the service', async () => {
      const removeTodo = jest
        .spyOn(todosService, 'remove')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => true);

      const result = await controller.remove(
        {
          userId: 'id123',
        },
        'id123'
      );

      expect(removeTodo).toBeCalledTimes(1);
      expect(removeTodo).toBeCalledWith('id123', 'id123');
      expect(result).toStrictEqual(true);
    });
  });
});
