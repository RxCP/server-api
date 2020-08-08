import { Config, verifyPassword } from '@foal/core';
import { isCommon } from '@foal/password';
import { getRepository, UpdateResult } from 'typeorm';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './user.dto';

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

  async archiveById(userId: number) {
    return await this.repository.softDelete(userId);
  }

  async restoreById(userId: number) {
    return await this.repository.restore(userId);
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

      for (const item in dto) {
        user[item] = dto[item];
      }

      await user.setPassword(dto.password);

      return await this.repository.save(user);
    } catch (error) {
      const errorMsg = Config.get2('settings.debug', 'boolean')
        ? error.message
        : 'Something went wrong!';
      return Promise.reject(errorMsg);
    }
  }

  async updateOne(userId: number, dto: UpdateUserDto): Promise<UpdateResult | string> {
    const user = await this.findById(userId);

    if (!user) {
      return Promise.reject('User not found');
    }

    try {
      // don't update the password and email
      const newDto = Object.assign({}, dto);
      delete newDto.password;
      delete newDto.email;
      
      return await this.repository.update(user.id, newDto);
    } catch (error) {
      const errorMsg = Config.get2('settings.debug', 'boolean')
        ? error.message
        : 'Something went wrong!';
      return Promise.reject(errorMsg);
    }
  }
}
