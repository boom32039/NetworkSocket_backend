/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {Chat } from 'src/chat/entities/chat.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';


@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    type: Number,
})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
})
  @Column({unique : true})
  username: string;

  @ApiProperty({
    type: String,
})
  @Column()
  password: string;

  @ApiProperty({
    type: String,
})
  @Column({unique : true})
  nickname: string;

  @ApiProperty({
    type: String,
})
  
  @DeleteDateColumn()
  deleted_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @CreateDateColumn()
  created_at: string;

  @OneToMany(() => Chat, (chat) => chat.sender)
  senders: Chat[];

}
