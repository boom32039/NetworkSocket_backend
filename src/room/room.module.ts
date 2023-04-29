import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity'
import { Room } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Chat, User])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
