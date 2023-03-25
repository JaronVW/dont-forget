import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, disconnect } from 'mongoose';
import { Todo, TodoSchema } from '../schemas/todo.schema';
import { MongoClient } from 'mongodb';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

describe('TodosService', () => {
  let service: TodosService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let todoModel: Model<Todo>;
  let userModel: Model<User>;
  let createTodo, todo1, todo2, todo3;
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

        MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [TodosService],
    }).compile();
    service = app.get<TodosService>(TodosService);

    todoModel = app.get<Model<Todo>>(getModelToken(Todo.name));
    userModel = app.get<Model<User>>(getModelToken(User.name));

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('todos').deleteMany({});
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

    createTodo = new todoModel({
      title: 'test',
      description: 'test',
      dueDate: new Date(),
      dateCreated: new Date(),
      completed: false,
      tasks: [],
      numberOfTasks: 0,
      userRef: user1._id,
    });

    todo1 = new todoModel({
      title: 'test',
      description: 'test',
      dueDate: new Date(),
      dateCreated: new Date(),
      completed: false,
      tasks: [],
      numberOfTasks: 0,
      userRef: user1._id,
    });

    todo2 = new todoModel({
      title: 'test',
      description: 'test',
      dueDate: new Date(),
      dateCreated: new Date(),
      completed: false,
      tasks: [],
      numberOfTasks: 0,
      userRef: user1._id,
    });

    todo3 = new todoModel({
      title: 'test',
      description: 'test',
      dueDate: new Date(),
      dateCreated: new Date(),
      completed: false,
      tasks: [],
      numberOfTasks: 0,
      userRef: user3._id,
    });

    await user1.save();
    await user2.save();
    await user3.save();
    await todo1.save();
    await todo2.save();
    await todo3.save();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTodo', () => {
    it('should create a todo', async () => {
      const todo = await service.create(user1.id, createTodo);
      expect(todo).toBeDefined();
      expect(String(todo.userRef)).toEqual(user1.id);
    });

    it('should throw an error', async () => {
      await expect(service.create(user1.id, null)).rejects.toThrow();
    });
  });

  describe('find', () => {
    it('should return an array of todos', async () => {
      const result = await service.findAll(user1.id);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(2);
      expect(result[0].title).toEqual(String(todo1.title));
    });

    it('should return a todo', async () => {
      const result = await service.findOne(user1.id, todo1._id);
      expect(result).toBeDefined();
      expect(result.title).toEqual(String(todo1.title));
    });

    it('should return an empty array', async () => {
      const result = await service.findAll(user2.id);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(0);
    });
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  
});
