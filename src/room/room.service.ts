import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}
//   async createRoom() {
//     const users = await this.userRepository.findBy({
//       id: Not(userId),
//     });
//     return users;
//   }
  async getRoom(user1Id: number, user2Id: number) {
    const room = await this.roomRepository.find({
      where: [
        {
          user1Id: user1Id,
          user2Id: user2Id,
        },
        {
          user1Id: user2Id,
          user2Id: user1Id,
        },
      ],
    });
  }
}
