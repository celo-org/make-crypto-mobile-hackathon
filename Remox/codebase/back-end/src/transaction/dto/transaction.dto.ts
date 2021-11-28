import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { TokenType,StableTokenType, AltTokenType } from '../transaction.entity';
import { Type } from 'class-transformer';

export class SendCoinDto {
    @ApiProperty({ description: 'Sender address' })
    @IsNotEmpty()
    @IsString()
    toAddress: string;

    @ApiProperty({ description: 'Amount of coin' })
    @IsNotEmpty()
    @IsString()
    amount: string;

    @ApiProperty({ description: 'Phrase of address' })
    @IsNotEmpty()
    @IsString()
    phrase: string;
}

export class SendStableCoinDto extends SendCoinDto{
    @ApiProperty({ description: 'Type of Token', enum: StableTokenType, enumName: "StableTokenType" })
    @IsNotEmpty()
    stableTokenType: StableTokenType
}

export class SendAltCoinDto extends SendCoinDto{
    @ApiProperty({ description: 'Type of Token', enum: AltTokenType, enumName: "AltTokenType" })
    @IsNotEmpty()
    altTokenType: AltTokenType
}

export class SendMultipleTransactionDto{
    @ApiProperty({ description: 'Sender address' })
    @IsNotEmpty()
    @IsString()
    toAddress: string;

    @ApiProperty({ description: 'Amount of coin' })
    @IsNotEmpty()
    @IsString()
    amount: string;

    @ApiProperty({ description: 'Type of Token', enum: TokenType, enumName: "TokenType" })
    @IsNotEmpty()
    tokenType: TokenType
}
export class SendMultipleTransactionVsPhraseDto{
    @ApiProperty({ description: 'Address,amount and wallet type array',type:[SendMultipleTransactionDto] })
    @IsArray()
    @ValidateNested() // perform validation on children too
    @Type(() => SendMultipleTransactionDto)
    multipleAddresses:[SendMultipleTransactionDto]

    @ApiProperty({ description: 'Phrase of address' })
    @IsNotEmpty()
    @IsString()
    phrase:string
}