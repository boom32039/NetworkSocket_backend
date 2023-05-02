/* eslint-disable prettier/prettier */
import { Body, Controller, Patch, Request, Post, Response, Get, UseGuards } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier

import { UserService } from './user.service';

import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getClients(@Request() req) {
    const userId = req.user['id'] ; 
    const users = await this.userService.getClients(userId);
    return users ; 
  }

}
