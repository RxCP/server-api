import { getRepository } from 'typeorm';
import { User } from '../entities';
import { CreateUserDto, UserDto } from '../dto/userDto';
import { ErrorResponse } from '../../../common/interfaces/responseInterface';
import { Config } from '@foal/core';
import { isCommon } from '@foal/password';

export class UserService {
  repository = getRepository(User);

  async findByEmail(userEmail: string): Promise<User | undefined> {
    return this.repository.findOne({ email: userEmail });
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
      return Promise.reject({ message: errorMsg });
    }
  }
}
