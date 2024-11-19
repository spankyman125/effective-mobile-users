import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  async countAndResetProblems(): Promise<{ count: number }> {
    const [count] = await this.userModel.update(
      { problems: false },
      { where: { problems: true } },
    );
    return { count };
  }

  async reset() {
    console.log('Table reset');
    await User.truncate();
    console.log('Filling table');
    for (let i = 0; i < 1000; i++) {
      await this.sequelize.query(
        {
          query:
            'INSERT INTO "Users" ("firstName","lastName","age","gender","problems") VALUES ?',
          values: [
            [...Array(1000)].map((value, i) => {
              return [
                `Имя${i}`,
                `Фамилия${i}`,
                Math.floor(Math.random() * 60) + 18,
                i % 2 === 0 ? 'male' : 'female',
                Math.random() < 0.5,
              ];
            }),
          ],
        },
        { logging: false, raw: true },
      );
    }
    console.log('Table refilled');
  }
}
