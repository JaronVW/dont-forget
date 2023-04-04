import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Todo, TodoSchema, TodoDocument } from './todo.schema';

describe('TodoSchema', () => {
  let todoModel: Model<TodoDocument>;
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
        MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
      ],
    }).compile();

    todoModel = app.get<Model<TodoDocument>>(getModelToken(Todo.name));

    await todoModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(todoModel).toBeDefined();
  });

  it('should create a todo', async () => {
    const todo = new todoModel({
      title: 'Test Todo',
      description: 'This is a test todo',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
    });
    await todo.save();
    expect(todo._id).toBeDefined();
    expect(todo.title).toBe('Test Todo');
    expect(todo.description).toBe('This is a test todo');
  });

  it('should create a todo with a due date', async () => {
    const todo = new todoModel({
      title: 'Test Todo',
      description: 'This is a test todo with a due date!',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
      dueDate: new Date(),
    });
    await todo.save();
    expect(todo._id).toBeDefined();
    expect(todo.title).toBe('Test Todo');
    expect(todo.description).toBe('This is a test todo with a due date!');
    expect(todo.dueDate).toBeDefined();
  });

  it('should create a todo with a couple of tasks', async () => {
    const todo = new todoModel({
      title: 'Test Todo',
      description: 'This is a test todo with a couple of tasks!',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
      tasks: [
        {
          title: 'Task 1',
          completed: false,
        },
        {
          title: 'Task 2',
          completed: true,
        },
      ],
    });
    await todo.save();
    expect(todo._id).toBeDefined();
    expect(todo.title).toBe('Test Todo');
    expect(todo.description).toBe(
      'This is a test todo with a couple of tasks!'
    );
    expect(todo.tasks).toBeDefined();
    expect(todo.tasks.length).toBe(2);
    expect(todo.tasks[0].title).toBe('Task 1');
    expect(todo.tasks[0].completed).toBe(false);
    expect(todo.tasks[1].title).toBe('Task 2');
    expect(todo.tasks[1].completed).toBe(true);
  });

  it('todo has an empty array of tasks by default', async () => {
    const todo = new todoModel({
      title: 'Test Todo',
      description: 'This is a test todo with a couple of tasks!',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
    });

    await todo.save();
    expect(todo._id).toBeDefined();
    expect(todo.title).toBe('Test Todo');
    expect(todo.description).toBe(
      'This is a test todo with a couple of tasks!'
    );
    expect(todo.tasks).toBeDefined();
    expect(todo.tasks.length).toBe(0);
  });

  it('should throw an error if a todo is created without a title', async () => {
    const todo = new todoModel({
      description: 'This is a test todo',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
    });
    await expect(todo.save()).rejects.toThrow();
  });

  it('should throw an error if a todo is created without a description', async () => {
    const todo = new todoModel({
      title: 'Test Todo',
      userRef: '60f1b5b0b9b1a8a0b0b0b0b0',
    });
    await expect(todo.save()).rejects.toThrow();
  });

  it('should throw an error if a todo is created without a userRef', async () => {
    const todo = new todoModel({
      title: 'Test Todo',
      description: 'This is a test todo',
    });
    await expect(todo.save()).rejects.toThrow();
  });

  
});


