import { Config } from '@foal/core';
import { isCommon } from '@foal/password';
import { getRepository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './user.dto';

export class UserService {
  repository = getRepository(User);

  async findAll(query: { take: number; skip: number }): Promise<{}> {
    const take = query.take || 10;
    const skip = query.skip || 0;

    const [result, total] = await this.repository.findAndCount({
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findById(userId: number): Promise<User | undefined> {
    return await this.repository.findOne(userId);
  }

  async findByEmail(userEmail: string): Promise<User | undefined> {
    return await this.repository.findOne({ email: userEmail });
  }

  async createOne(dto: CreateUserDto): Promise<User | string> {
    const countEmail = await this.repository.count({
      where: { email: dto.email },
    });

    if (countEmail) {
      return Promise.reject(`Email address is already in use`);
    }

    // move this validation into DTO validation
    if (await isCommon(dto.password)) {
      return Promise.reject(
        'This password is too common. Please choose another one.',
      );
    }

    try {
      const user = new User();
      user.email = dto.email;
      user.firstName = dto.firstName;
      user.lastName = dto.lastName;
      await user.setPassword(dto.password);

      const savedUser = await this.repository.save(user);
      return Promise.resolve(savedUser);
    } catch (error) {
      const errorMsg = Config.get2('settings.debug', 'boolean')
        ? error.message
        : 'Something went wrong!';
      return Promise.reject(errorMsg);
    }
  }
}
