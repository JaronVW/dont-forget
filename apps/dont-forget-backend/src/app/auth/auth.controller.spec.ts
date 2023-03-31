import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Neo4jService } from '../neo4j/neo4j.service';
import { AuthService } from './auth.service';
import { mockNode, mockResult } from '../neo4j/neo4jMockObjects';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
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

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Register', () => {
    it('should call register on the service', async () => {
      const mockServiceResponse = {
        access_token: 'token',
      };

      const serviceMock = jest
        .spyOn(authService, 'register')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => mockServiceResponse);

      const neoRes = jest.spyOn(neo4jService, 'write').mockResolvedValue(
        mockResult([
          {
            b: mockNode('User', {
              mongoId: '63f4ce429dd69089ef4dc1bc',
              username: 'username',
            }),
          },
        ])
      );
      const result = await controller.register({
        username: 'username',
        password: '1234aA!',
        email: 'email@email.com',
      });
      expect(serviceMock).toBeCalledTimes(1);
      expect(neoRes).toBeCalledTimes(1);
      expect(result).toEqual(mockServiceResponse);
    });

    it('should throw a Bad Request Exception if the data is wrong', async () => {
      jest
        .spyOn(authService, 'register')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockRejectedValue(new BadRequestException());

      jest.spyOn(neo4jService, 'write').mockResolvedValue(
        mockResult([
          {
            b: mockNode('User', {
              mongoId: '63f4ce429dd69089ef4dc1bc',
              username: 'username',
            }),
          },
        ])
      );
      await expect(
        controller.register({
          username: 'username',
          password: '1234aA!',
          email: 'email@email.com',
        })
      ).rejects.toThrowError(BadRequestException);
    });

    it('should throw a conflict Exception if the user already exists', async () => {
      const mockServiceResponse = {
        access_token: 'token',
      };

      jest
        .spyOn(authService, 'register')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockRejectedValue(new ConflictException());

      jest.spyOn(neo4jService, 'write').mockResolvedValue(
        mockResult([
          {
            b: mockNode('User', {
              mongoId: '63f4ce429dd69089ef4dc1bc',
              username: 'username',
            }),
          },
        ])
      );
      await expect(
        controller.register({
          username: 'username',
          password: '1234aA!',
          email: 'email@email.com',
        })
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('Login', () => {
    it('should call login on the service', async () => {
      const response = {
        access_token: 'token',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(response);
      const result = await controller.login({
        user: {
          _doc: { username: 'username', password: '1234aA!' },
        },
      });
      expect(result).toBeDefined();
      expect(result).toEqual(response);
    });
  });
});
