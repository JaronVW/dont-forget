import { Injectable } from '@nestjs/common';
import argon2 = require('argon2');
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOneUser(email);
      if (await argon2.verify(user.password, password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch {
      return null;
    }
  }
}
