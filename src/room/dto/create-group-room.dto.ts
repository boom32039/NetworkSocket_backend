/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateGroupRoomDto {
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    roomName : string ; 
}
