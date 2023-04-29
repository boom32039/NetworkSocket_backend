/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateSingleRoomDto {
    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    userId : number ; 
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    password : string ; 
}
