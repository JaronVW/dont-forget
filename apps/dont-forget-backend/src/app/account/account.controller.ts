import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { AuthUser } from '../decorators/user.decorator';
import {
  followUser,
  followsMe,
  followsMeRemove,
  getFollowersFollowing as getFollowingFollowing,
  getFollowing,
  unfollowUser,
  deleteUserNode,
} from '../neo4j/cypherQueries';
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private neo4jService: Neo4jService
  ) {}

  @Post('follow/:username')
  async followUser(@Param('username') username: string, @AuthUser() user: any) {
    try {
      const res = await this.neo4jService.write(followUser, {
        idParam: user.userId,
        usernameParam: username,
      });

      return {
        statusCode: 200,
        message: `User ${res.records[0].get('b').properties.username} followed`,
      };
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  @Post('unfollow/:username')
  async unfollowUser(
    @Param('username') username: string,
    @AuthUser() user: any
  ) {
    try {
      const res = await this.neo4jService.write(unfollowUser, {
        idParam: user.userId,
        usernameParam: username,
      });
      return {
        statusCode: 200,
        message: `User ${
          res.records[0].get('b').properties.username
        } unfollowed`,
      };
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  @Get('following')
  async getFollowing(@AuthUser() user: any) {
    try {
      const res = await this.neo4jService.read(getFollowing, {
        idParam: user.userId,
      });
      const followingIds = res.records.map(
        (record) => record.get('b').properties.mongoId
      );
      return this.accountService.getUsersList(followingIds);
    } catch {
      return [];
    }
  }

  @Get('followingfollowing')
  async getFollowingFollowing(@AuthUser() user: any) {
    try {
      const res = await this.neo4jService.read(getFollowingFollowing, {
        idParam: user.userId,
      });

      const followingIds = res.records.map(
        (record) => record.get('user').properties.mongoId
      );
      return this.accountService.getUsersList(followingIds);
    } catch (err) {
      return [];
    }
  }

  @Get('followers')
  async getFollowers(@AuthUser() user: any) {
    try {
      const res = await this.neo4jService.read(followsMe, {
        idParam: user.userId,
      });

      const followersIds = res.records.map(
        (record) => record.get('b').properties.mongoId
      );
      return this.accountService.getUsersList(followersIds);
    } catch {
      return [];
    }
  }

  @Post('followersunfollow/:username')
  async getFollowersUnfollow(
    @Param('username') username: string,
    @AuthUser() user: any
  ) {
    try {
      const res = await this.neo4jService.write(followsMeRemove, {
        idParam: user.userId,
        usernameParam: username,
      });
      return {
        statusCode: 200,
        message: `User ${
          res.records[0].get('b').properties.username
        } removed from followers`,
      };
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  @Delete('deleteaccount')
  async deleteAccount(@AuthUser() user: any) {
    try {
      const res = await this.accountService.deleteAccount(user.userId);
      this.neo4jService.write(deleteUserNode, {
        idParam: user.userId,
      });
    } catch (err) {
      console.log(err);
      throw new NotFoundException('User not found');
    }
  }
}
