import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { Chat } from './entities/chat.entity';
import { Room } from 'src/room/entities/room.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}
  async createMessage(createMessageDto: CreateMessageDto): Promise<Chat> {
    const senderId = createMessageDto.senderId;
    const roomId = createMessageDto.roomId;
    const chat = await this.chatRepository.create(createMessageDto);
    chat.sender = await this.userRepository.findOneBy({ id: Number(senderId) });
    chat.room = await this.roomRepository.findOneBy({
      roomId: Number(roomId),
    });
    return await this.chatRepository.save(chat);
  }

  async getMessages(roomId: number) {
    return await this.chatRepository.find({
      relations: {
        sender: true,
      },
      where: {
        room: { roomId: roomId },
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }
}
