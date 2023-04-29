/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class GetSingleRoomDto {
    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    receiverId : number ; 
}
