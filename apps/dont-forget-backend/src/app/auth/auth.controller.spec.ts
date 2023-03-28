import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Neo4jService } from '../neo4j/neo4j.service';
import { AuthService } from './auth.service';

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
    const mockServiceResponse = {
      access_token: 'token'
    }
    it('should call register on the service', async () => {
      const serviceMock = jest
        .spyOn(authService, 'register')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => mockServiceResponse);

      const result = await controller.register({
        username: 'username',
        password: '1234aA!',
        email: 'email@email.com',
      });
    });
  });
});
