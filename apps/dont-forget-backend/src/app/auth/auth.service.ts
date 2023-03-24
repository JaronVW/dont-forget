import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import argon2 = require('argon2');
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { userSignUpDto } from './UserSignUpDto';
import { Neo4jService } from '../neo4j/neo4j.service';
import { User } from '../schemas/user.schema';
import { createUserNode } from '../neo4j/cypherQueries';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly neo4jService: Neo4jService
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
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: userSignUpDto): Promise<{ access_token: string }> {
    try {
      const hashedPassword = await argon2.hash(user.password);
      const newUser: User = {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        dateCreated: new Date(),
      };
      const data = await this.usersService.createUser(newUser);
      await this.neo4jService.write(createUserNode, {
        idParam: data._id.toString(),
        usernameParam: data.username,
      });
      const payload = { username: data.email, sub: data._id.toString() };
      const accessToken = this.jwtService.sign(payload);
      return {
        access_token: accessToken,
      };
    } catch (error) {
     throw new BadRequestException(error);
    }
  }
}
