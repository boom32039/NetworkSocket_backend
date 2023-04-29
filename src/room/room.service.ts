import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateGroupRoomDto } from './dto/create-group-room.dto';
import { Not, Repository } from 'typeorm';
import { GetSingleRoomDto } from './dto/get-single-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}
  async createGroupRoom(createGroupRoomDto: CreateGroupRoomDto) {
    const room = await this.roomRepository.create(createGroupRoomDto);
    room.roomType = 'group';
    return await this.roomRepository.save(room);
  }

  async getGroupRooms() {
    const room = await this.roomRepository.find({
      where: {
        roomType: 'group',
      },
    });
    return room;
  }

  async createSingleRoom(user1Id: number, user2Id : number) {
    const room = new Room()
    room.user1Id = user1Id ;
    room.user2Id = user2Id ;
    room.roomType = 'single' ; 
    return await this.roomRepository.save(room)
  }

  async getSingleRoomId(user1Id: number, user2Id: number) {
    const roomType = 'single';
    const room = await this.roomRepository.findOne({
      select: { roomId: true },
      where: [
        {
          user1Id: user1Id,
          user2Id: user2Id,
          roomType: roomType,
        },
        {
          user1Id: user2Id,
          user2Id: user1Id,
          roomType: roomType,
        },
      ],
    });
    return room;
  }
}
