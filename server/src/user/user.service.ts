import { Injectable } from '@nestjs/common';
import { User } from '../shared/interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    const usersFromJson = JSON.parse(process.env.USERS ?? '') ?? {};
    const users = Object.keys(usersFromJson).map(k => ({
      username: k,
      passwordHash: usersFromJson[k],
    }));
    this.users = users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username == username);
  }
}
