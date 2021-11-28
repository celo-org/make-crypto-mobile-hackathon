import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto{
    @ApiProperty({description:'Title of team'})
    @IsNotEmpty()
    @IsString()
    title:string;
}