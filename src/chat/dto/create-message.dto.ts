/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateMessageDto {

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    senderId : number

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    roomId : number

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    message : string ;   

}
