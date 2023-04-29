import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Chat } from 'src/chat/entities/chat.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  roomId: number;

  @Column()
  roomName: string;

  @Column()
  user1Id: number;

  @Column()
  user2Id: number;

  @Column()
  roomType: string;

  @OneToMany(() => Chat, (chat) => chat.room)
  chats: Chat[];

  @CreateDateColumn()
  createdAt: Date;
}
