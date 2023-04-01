import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Node, int } from 'neo4j-driver';
import { getFollowing } from '../neo4j/cypherQueries';
import { mockNode, mockResult } from '../neo4j/neo4jMockObjects';
import { NotFoundException } from '@nestjs/common';

jest.mock('neo4j-driver/lib/driver');

describe('AccountController', () => {
  let controller: AccountController;
  let accountService: AccountService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            getUsersList: jest.fn(),
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

    controller = module.get<AccountController>(AccountController);
    accountService = module.get<AccountService>(AccountService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFollowing', () => {
    it('calls getFollowing on the service', async () => {
      const data = {
        mongoId: '6419e36ed9d21671647ddd1e',
        username: 'testuser',
      };

      const getFollowing = jest
        .spyOn(neo4jService, 'read')

        .mockResolvedValue(
          mockResult([
            {
              b: mockNode('NoteBlock', { ...data, id: 'id123' }),
            },
          ])
        );
      jest
        .spyOn(accountService, 'getUsersList')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => [
          {
            _id: '63f4ce429dd69089ef4dc1bc',
            username: 'jaron2',
          },
        ]);
      const result = await controller.getFollowing({
        userId: 'id123',
      });
      expect(getFollowing).toBeCalledTimes(1);
      expect(result).toStrictEqual([
        {
          _id: '63f4ce429dd69089ef4dc1bc',
          username: 'jaron2',
        },
      ]);
    });

    it('returns an empty array if no results', async () => {
      const getFollowing = jest
        .spyOn(neo4jService, 'read')

        .mockResolvedValue(
          mockResult([
            {
              b: [],
            },
          ])
        );
      jest
        .spyOn(accountService, 'getUsersList')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => []);
      const result = await controller.getFollowing({
        userId: 'id123',
      });
      expect(getFollowing).toBeCalledTimes(1);
      expect(result).toStrictEqual([]);
    });
  });

  describe('get following -> following', () => {
    it('calls getFollowingfollowing on the service', async () => {
      const data = {
        mongoId: '6419e36ed9d21671647ddd1e',
        username: 'testuser',
      };

      const getFollowing = jest.spyOn(neo4jService, 'read').mockResolvedValue(
        mockResult([
          {
            user: mockNode('User', { ...data, id: 'test-note' }),
          },
        ])
      );
      jest
        .spyOn(accountService, 'getUsersList')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => [
          {
            _id: '63f4ce429dd69089ef4dc1bc',
            username: 'jaron2',
          },
        ]);
      const result = await controller.getFollowingFollowing({
        userId: 'id123',
      });
      expect(getFollowing).toBeCalledTimes(1);
      expect(result).toStrictEqual([
        {
          _id: '63f4ce429dd69089ef4dc1bc',
          username: 'jaron2',
        },
      ]);
    });

    it('returns an empty array if no results', async () => {
      const getFollowing = jest
        .spyOn(neo4jService, 'read')

        .mockResolvedValue(
          mockResult([
            {
              user: [],
            },
          ])
        );
      jest
        .spyOn(accountService, 'getUsersList')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => []);
      const result = await controller.getFollowingFollowing({
        userId: 'id123',
      });
      expect(getFollowing).toBeCalledTimes(1);
      expect(result).toStrictEqual([]);
    });
  });

  describe('followers', () => {
    it('calls getFollowing on the service', async () => {
      const data = {
        mongoId: '6419e36ed9d21671647ddd1e',
        username: 'testuser',
      };
      const getFollowing = jest
        .spyOn(neo4jService, 'read')

        .mockResolvedValue(
          mockResult([
            {
              b: mockNode('NoteBlock', { ...data, id: 'id123' }),
            },
          ])
        );
      jest
        .spyOn(accountService, 'getUsersList')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => [
          {
            _id: '63f4ce429dd69089ef4dc1bc',
            username: 'jaron2',
          },
        ]);
      const result = await controller.getFollowers({
        userId: 'id123',
      });
      expect(getFollowing).toBeCalledTimes(1);
      expect(result).toStrictEqual([
        {
          _id: '63f4ce429dd69089ef4dc1bc',
          username: 'jaron2',
        },
      ]);
    });

    it('returns an empty array if no results', async () => {
      const getFollowing = jest.spyOn(neo4jService, 'read').mockResolvedValue(
        mockResult([
          {
            b: [],
          },
        ])
      );
      jest
        .spyOn(accountService, 'getUsersList')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .mockImplementation(async () => []);
      const result = await controller.getFollowers({
        userId: 'id123',
      });
      expect(getFollowing).toBeCalledTimes(1);
      expect(result).toStrictEqual([]);
    });
  });

  describe('follow', () => {
    it('makes a follow relationship', async () => {
      const data = {
        idParam: '6419e36ed9d21671647ddd1e',
        usernameParam: 'testuser',
      };

      const follow = jest.spyOn(neo4jService, 'write').mockResolvedValue(
        mockResult([
          {
            b: mockNode('NoteBlock', {
              mongoId: '6423216b756f83fbbecab412',
              username: 'testuser',
            }),
          },
        ])
      );

      const result = await controller.followUser('testuser', {
        userId: '6419e36ed9d21671647ddd1e',
      });
      expect(follow).toBeCalledTimes(1);
      expect(result).toStrictEqual({
        statusCode: 200,
        message: 'User testuser followed',
      });
    });

    it('returns an error if no user found', async () => {
      jest.spyOn(neo4jService, 'write').mockResolvedValue(
        mockResult([
          {
            b: [],
          },
        ])
      );

      await expect(
        controller.followUser('testuser', {
          userId: '6419e36ed9d21671647ddd1e',
        })
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('unfollow', () => {
    it('deletes a follow relationship', async () => {
      const data = {
        idParam: '6419e36ed9d21671647ddd1e',
        usernameParam: 'testuser',
      };

      const follow = jest.spyOn(neo4jService, 'write').mockResolvedValue(
        mockResult([
          {
            b: mockNode('NoteBlock', {
              mongoId: '6423216b756f83fbbecab412',
              username: 'testuser',
            }),
          },
        ])
      );

      const result = await controller.unfollowUser('testuser', {
        userId: '6419e36ed9d21671647ddd1e',
      });
      expect(follow).toBeCalledTimes(1);
      expect(result).toStrictEqual({
        statusCode: 200,
        message: 'User testuser unfollowed',
      });
    });

    it('returns an error if no user found', async () => {
      jest.spyOn(neo4jService, 'write').mockResolvedValue(
        mockResult([
          {
            b: [],
          },
        ])
      );
      await expect(
        controller.unfollowUser('testuser', {
          userId: '6419e36ed9d21671647ddd1e',
        })
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('followersRemove', () => {
    it('deletes a follow relationship', async () => {
      const data = {
        idParam: '6419e36ed9d21671647ddd1e',
        usernameParam: 'testuser',
      };

      const follow = jest.spyOn(neo4jService, 'write').mockResolvedValue(
        mockResult([
          {
            b: mockNode('NoteBlock', {
              mongoId: '6423216b756f83fbbecab412',
              username: 'testuser',
            }),
          },
        ])
      );

      const result = await controller.getFollowersUnfollow('testuser', {
        userId: '6419e36ed9d21671647ddd1e',
      });
      expect(follow).toBeCalledTimes(1);
      expect(result).toStrictEqual({
        statusCode: 200,
        message: 'User testuser removed from followers',
      });
    });

    it('returns an error if no user found', async () => {
      jest.spyOn(neo4jService, 'write').mockResolvedValue(
        mockResult([
          {
            b: [],
          },
        ])
      );
      await expect(
        controller.getFollowersUnfollow('testuser', {
          userId: '6419e36ed9d21671647ddd1e',
        })
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
