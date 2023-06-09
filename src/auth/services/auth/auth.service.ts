import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.getUserByName(username);

    if (userDB && comparePasswords(password, userDB.password)) return userDB;
    return null;
  }
}
