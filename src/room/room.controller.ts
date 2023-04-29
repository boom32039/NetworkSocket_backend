/* eslint-disable prettier/prettier */
import { Body, Controller, Patch, Request, Post, Response, Get, UseGuards } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier

import { RoomService } from './room.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateGroupRoomDto } from './dto/create-group-room.dto';
import { GetSingleRoomDto } from './dto/get-single-room.dto';
@UseGuards(JwtAuthGuard)
@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  
  @Post('group')
  async createGroupRoom(@Body() createGroupRoomDto : CreateGroupRoomDto) {
    return await this.roomService.createGroupRoom(createGroupRoomDto);
  }

  @Get('group')
  async getGroupRooms() {
    return await this.roomService.getGroupRooms();
  }

  @Post('single')
  async getSingleRoom(@Body() getSingleRoomIdDto : GetSingleRoomDto, @Request() req ) {
    const senderId = req.user['id'];
    const room = await this.roomService.getSingleRoomId(senderId , getSingleRoomIdDto.receiverId);
    console.log(room)
    if (!room) return await this.roomService.createSingleRoom(senderId, getSingleRoomIdDto.receiverId);
    return room;
    
  }

  

}
