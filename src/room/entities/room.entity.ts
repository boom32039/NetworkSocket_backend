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

  @Column({ nullable: true })
  roomName: string;

  @Column({ nullable: true })
  user1Id: number;

  @Column({ nullable: true })
  user2Id: number;

  @Column()
  roomType: string;

  @OneToMany(() => Chat, (chat) => chat.room)
  chats: Chat[];

  @CreateDateColumn()
  createdAt: Date;
}
