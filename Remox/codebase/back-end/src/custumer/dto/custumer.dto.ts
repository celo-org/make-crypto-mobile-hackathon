import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class AddCustumerDto{
    @ApiProperty({description:"Custumer name"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({description:'Custumer address'})
    @IsNotEmpty()
    @IsString()
    address:string
}