import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  UseFilters,
} from '@nestjs/common';
import { Public } from '../decorators/public.route.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { userSignUpDto } from './UserSignUpDto';
import { MongoExceptionFilter } from '../../exceptionfilters/MongoFilter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user._doc);
  }

  @Public()
  @Post('register')
  @UseFilters(MongoExceptionFilter)
  async register(@Body() user: userSignUpDto) {
    return await this.authService.register(user);
  }
}
