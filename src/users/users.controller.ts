import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    void usersService.reset();
  }

  @Post('reset-problems')
  async resetProblems() {
    return this.usersService.countAndResetProblems();
  }

  @Post('reset-db')
  async resetDb() {
    return this.usersService.reset();
  }
}
