import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { TokenType } from "src/transaction/transaction.entity";

export class CreateTeamMemberDto{
    @ApiProperty({description:'Name of team member'})
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty({description:'Address of team member'})
    @IsNotEmpty()
    @IsString()
    address:string;

    @ApiProperty({ description: 'Type of Token', enum: TokenType, enumName: "TokenType" })
    @IsNotEmpty()
    currency:TokenType;

    @ApiProperty({description:'The amount send'})
    @IsNotEmpty()
    @IsString()
    amount:string;

    @ApiProperty({description:'Team id which this team member will add'})
    @IsNotEmpty()
    @IsString()
    teamId: string;
}

export class UpdateTeamMemberDto{
    @ApiProperty({description:'Id of team member'})
    @IsNotEmpty()
    @IsUUID()
    id:string;

    @ApiPropertyOptional({description:'Name of team member'})
    @IsOptional()
    @IsString()
    name?:string;

    @ApiPropertyOptional({description:'Address of team member'})
    @IsOptional()
    @IsString()
    address?:string;

    @ApiPropertyOptional({ description: 'Type of Token', enum: TokenType, enumName: "TokenType" })
    @IsOptional()
    currency?:TokenType;

    @ApiPropertyOptional({description:'The amount send'})
    @IsOptional()
    @IsString()
    amount?:string;

    @ApiPropertyOptional({description:'Team id of team member'})
    @IsOptional()
    @IsUUID()
    teamId?:string;
}