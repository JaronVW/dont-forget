import { Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { AuthUser } from '../decorators/user.decorator';
import { followUser, getFollowing } from '../neo4j/cypherQueries';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private neo4jService: Neo4jService
  ) {}

  @Post('follow/:userId')
  async followUser(@Param('userId') id: string, @AuthUser() user: any) {
    const res = await this.neo4jService.write(followUser, {
      idParam: user.userId,
      idParamtoFollow: id,
    });
    console.log(res);
    return {};
  }

  @Get('following')
  async getFollowing(@AuthUser() user: any) {
    const res = await this.neo4jService.read(getFollowing, {
      idParam: user.userId,
    });
    const followingIds = res.records.map(
      (record) => record.get('b').properties.name
    );
    return this.accountService.getFollowing(followingIds);
  }
}
