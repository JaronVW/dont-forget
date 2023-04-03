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
  @Public()
  getData() {
    return this.appService.getData();
  }
}
