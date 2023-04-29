import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Room } from 'src/room/entities/room.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.senders)
  sender: User;

  @ManyToOne(() => Room, (room) => room.chats)
  room: Room;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
