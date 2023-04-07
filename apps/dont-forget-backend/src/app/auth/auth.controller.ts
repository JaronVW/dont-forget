import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  UseFilters,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Public } from '../decorators/public.route.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { userSignUpDto } from './UserSignUpDto';
import { MongoExceptionFilter } from '../../exceptionfilters/MongoFilter';
import { Neo4jService } from '../neo4j/neo4j.service';
import { createUserNode } from '../neo4j/cypherQueries';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly neo4jService: Neo4jService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user._doc);
  }

  @Public()
  @Post('register')
  async register(@Body() user: userSignUpDto) {
    try {
      const newUser = await this.authService.register(user);
      await this.neo4jService.write(createUserNode, {
        idParam: String(newUser.id),
        usernameParam: user.username,
      });
      return newUser;
    } catch (error) {
      
      error instanceof ConflictException;
      
      if (error instanceof ConflictException) throw error;
      else throw new BadRequestException();
    }
  }
}
