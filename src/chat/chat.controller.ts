import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { GetMessagesDto } from './dto/get-messages.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post(':roomId')
  async getMessages(@Param('roomId') id: string) {
    const roomId = parseInt(id);
    const messages = await this.chatService.getMessages(roomId);
    return messages;
  }
}
