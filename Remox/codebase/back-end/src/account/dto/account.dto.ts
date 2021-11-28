import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrbitEntityDto {
    @IsOptional()
    @IsString()
    userName?: string;

    @IsOptional()
    @IsString()
    surname?: string;

    @IsOptional()
    @IsString()
    companyName?: string;

    @IsNotEmpty()
    @IsString()
    iv!: string;

    @IsNotEmpty()
    @IsString()
    address!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class CreateAccountDto {
    @ApiPropertyOptional({ description: 'User name' })
    @IsOptional()
    @IsString()
    userName?: string;

    @ApiPropertyOptional({ description: 'User surname' })
    @IsOptional()
    @IsString()
    surname?: string;

    @ApiPropertyOptional({ description: 'Company name of user' })
    @IsOptional()
    @IsString()
    companyName?: string;

    @ApiProperty({ description: 'Password for account' })
    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class SigninDto {
    @ApiPropertyOptional({ description: 'Phrase of account' })
    @IsNotEmpty()
    @IsString()
    phrase!: string;

    @ApiProperty({ description: 'Password for account' })
    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class IsAccountExistDto {
    @ApiPropertyOptional({ description: 'Phrase of account' })
    @IsNotEmpty()
    @IsString()
    phrase!: string
}

export class ReLoginDto {
    @ApiPropertyOptional({ description: 'Password of account' })
    @IsNotEmpty()
    @IsString()
    password!: string

    @ApiPropertyOptional({ description: 'Address of account' })
    @IsNotEmpty()
    @IsString()
    address!: string
}

export class UpdateAccountDto {
    @ApiPropertyOptional({ description: 'User name of account' })
    @IsOptional()
    @IsString()
    userName?: string

    @ApiPropertyOptional({ description: 'Surname of account' })
    @IsOptional()
    @IsString()
    surname?: string

    @ApiPropertyOptional({ description: 'Company name of account' })
    @IsOptional()
    @IsString()
    companyName?: string
}