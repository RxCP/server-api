import { getRepository } from 'typeorm';
import { User } from '../entities';

export class UserService {
  repository = getRepository(User);

  async findOne(userID: number): Promise<User | undefined> {
    return this.repository.findOne(userID)
  }
}