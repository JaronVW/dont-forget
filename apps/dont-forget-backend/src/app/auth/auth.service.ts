import { BadRequestException, Injectable } from '@nestjs/common';
import argon2 = require('argon2');
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { userSignUpDto } from './UserSignUpDto';
import { Neo4jService } from '../neo4j/neo4j.service';

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

  async register(user: userSignUpDto) {
    try {
      userData.password = await argon2.hash(userData.password);
      userData.dateCreated = new Date();
      const userData = await this.usersService.createUser(user);
     
      console.log(userData);
      await this.neo4jService.write(
        'CREATE (n:User {mongoId: $idParam, username: $usernameParam})',
        {
          idParam: userData._id.toString(),
          usernameParam: userData.username,
        }
      );
      const payload = { username: userData.email, sub: userData._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch(e) {
      console.log(e);
      return e
    }
  }
}
