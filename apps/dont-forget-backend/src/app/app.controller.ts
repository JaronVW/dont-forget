import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './decorators/public.route.decorator';
import { Neo4jService } from './neo4j/neo4j.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly neo4jService: Neo4jService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Public()
  @Get('helloneo')
  async getHello(): Promise<any> {
    const res = await this.neo4jService.read(
      `MATCH (n) RETURN count(n) AS count`,
      {}
    );
    return `There are ${res.records[0].get('count')} nodes in the database`;
  }
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
