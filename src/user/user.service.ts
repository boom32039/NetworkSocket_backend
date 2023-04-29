import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Not, Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getClients(userId: number): Promise<User[]> {
    const users = await this.userRepository.findBy({
      id: Not(userId),
    });
    return users;
  }
}
