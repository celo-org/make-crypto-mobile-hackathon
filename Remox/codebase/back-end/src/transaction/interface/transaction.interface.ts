import { ApiProperty } from '@nestjs/swagger';
import { TokenType } from '../transaction.entity';

export class IGetAccountInfo{
    @ApiProperty()
    celoBalance:string;
    
    @ApiProperty()
    cUSDBalance:string;
}

export class IGetTransactionReceipt{
    @ApiProperty()
    tranHash!: string;

    @ApiProperty()
    block!: string;

    @ApiProperty()
    gasUsed!:string

    @ApiProperty()
    from!: string;

    @ApiProperty()
    status!:boolean

    @ApiProperty()
    tokenType: TokenType

    @ApiProperty()
    to!: string

    @ApiProperty()
    value!: string
}