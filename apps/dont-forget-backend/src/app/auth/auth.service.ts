import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import argon2 = require('argon2');
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { userSignUpDto } from './UserSignUpDto';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.usersService.findOneUser(username);
      if (await argon2.verify(user.password, password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch {
      return null;
    }
  }

  async login(user: any) {
    
    const payload = { username: user.email, sub: user._id };
    return await {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    user: userSignUpDto
  ): Promise<{ access_token: string; id: string }> {
    try {
      const hashedPassword = await argon2.hash(user.password);
      const newUser: User = {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        dateCreated: new Date(),
      };
      const data = await this.usersService.createUser(newUser);

      const payload = { username: data.email, sub: String(data._id) };
      const accessToken = this.jwtService.sign(payload);
      return {
        access_token: accessToken,
        id: data._id,
      };
    } catch (error) {
      
      if (error.code === 11000) {
        throw new ConflictException('Email/username is already in use');
      }
      throw new InternalServerErrorException();
    }
  }
}
