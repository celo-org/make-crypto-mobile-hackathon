import { Controller, Post, Get, Body, Res, HttpStatus, UseGuards, Req, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBody, ApiTags, ApiOkResponse, ApiForbiddenResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ParamDto, SendAltCoinDto, SendCoinDto, SendMultipleTransactionVsPhraseDto, SendStableCoinDto } from './dto'
import { IGetAccountInfo } from './interface';
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) { }

    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: IGetAccountInfo })
    @ApiBearerAuth('JWT-auth')
    @Get('balance')
    async balance(@Res() res: Response, @Req() req: any): Promise<Response> {
        const result = await this.transactionService.accountInfo(req.user.accountAddress);
        return res.status(HttpStatus.OK).json(result)
    }

    @Get('currency')
    async getCoinCurrency(@Res() res: Response, @Req() req: any): Promise<Response> {
        const result = await this.transactionService.getCoinCurrency();
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Get("/:hash")
    async getTransaction(@Res() res:Response,@Req() req:any,@Param() param:ParamDto):Promise<Response> {
        const result = await this.transactionService.getTransaction(param.hash)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: SendCoinDto })
    @ApiOkResponse({ type: SendCoinDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Post('sendCelo')
    async sendCelo(@Req() req: any, @Res() res: Response, @Body() dto: SendCoinDto): Promise<Response> {
        const result = await this.transactionService.sendCelo(dto, req.user.userId)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: SendCoinDto })
    @ApiOkResponse({ type: SendCoinDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Post('sendStableCoin')
    async sendcUSDOrcEUR(@Req() req: any, @Res() res: Response, @Body() dto: SendStableCoinDto): Promise<Response> {
        const result = await this.transactionService.sendcUSDOrcEUR(dto, req.user.userId);
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: SendAltCoinDto })  
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Post('sendAltCoin')
    async sendAltCoin(@Req() req: any, @Res() res: Response, @Body() dto: SendAltCoinDto): Promise<Response> {
        const result = await this.transactionService.sendAltCoin(dto, req.user.userId);
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: SendMultipleTransactionVsPhraseDto })
    @ApiOkResponse()
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Post('multipleTran')
    async sendMultipleTran(@Req() req: any, @Res() res: Response, @Body() dto: SendMultipleTransactionVsPhraseDto): Promise<Response> {
        const result = await this.transactionService.sendMultipleCelo(dto, req.user.userId);
        return res.status(HttpStatus.OK).json(result)
    }
}
