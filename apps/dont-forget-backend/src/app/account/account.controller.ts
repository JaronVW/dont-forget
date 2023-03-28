import {
  Controller,
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
} from '../neo4j/cypherQueries';
import fs = require('fs');
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private neo4jService: Neo4jService
  ) {}

  @Post('follow/:username')
  async followUser(@Param('username') username: string, @AuthUser() user: any) {
    const res = await this.neo4jService
      .write(followUser, {
        idParam: user.userId,
        usernameParam: username,
      })
      .then((res) => {
        return {
          statusCode: 200,
          message: `User ${
            res.records[0].get('b').properties.username
          } followed`,
        };
      })
      .catch(() => {
        throw new NotFoundException('User not found');
      });
    return res;
  }

  @Post('unfollow/:username')
  async unfollowUser(
    @Param('username') username: string,
    @AuthUser() user: any
  ) {
    const res = await this.neo4jService
      .write(unfollowUser, {
        idParam: user.userId,
        usernameParam: username,
      })
      .then((res) => {
        console.log(res.records);
        return {
          statusCode: 200,
          message: `User ${username} unfollowed`,
        };
      })
      .catch((err) => {
        console.log(err);
        throw new NotFoundException('User not found');
      });
    return res;
  }

  @Get('following')
  async getFollowing(@AuthUser() user: any) {
    const res = await this.neo4jService.read(getFollowing, {
      idParam: user.userId,
    });
    fs.writeFileSync('test.json', JSON.stringify(res));
    let followingIds = [];
    if (res.records.length > 1) {
      followingIds = res.records.map(
        (record) => record.get('b').properties.mongoId
      );
    }

    return this.accountService.getUsersList(followingIds);
  }

  @Get('followingfollowing')
  async getFollowingFollowing(@AuthUser() user: any) {
    const res = await this.neo4jService.read(getFollowingFollowing, {
      idParam: user.userId,
    });

    const followingIds = res.records.map(
      (record) => record.get('user').properties.mongoId
    );
    return this.accountService.getUsersList(followingIds);
  }

  @Get('followers')
  async getFollowers(@AuthUser() user: any) {
    const res = await this.neo4jService.read(followsMe, {
      idParam: user.userId,
    });

    const followersIds = res.records.map(
      (record) => record.get('b').properties.mongoId
    );
    return this.accountService.getUsersList(followersIds);
  }

  @Post('followersunfollow/:username')
  async getFollowersUnfollow(
    @Param('username') username: string,
    @AuthUser() user: any
  ) {
    const res = await this.neo4jService
      .write(followsMeRemove, {
        idParam: user.userId,
        usernameParam: username,
      })
      .then((res) => {
        console.log(res.records);
        return {
          statusCode: 200,
          message: `User ${username} removed`,
        };
      })
      .catch((err) => {
        console.log(err);
        throw new NotFoundException('User not found');
      });
    return res;
  }
}
