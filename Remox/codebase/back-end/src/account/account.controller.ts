import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
import { AccountService } from './account.service';
import {CreateAccountDto, IsAccountExistDto, ReLoginDto, SigninDto, UpdateAccountDto} from './dto'

@ApiTags('Account')
@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService){}

    @ApiBody({ type: CreateAccountDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Post('create')
    async createAccount(@Res() res: Response,@Body() dto:CreateAccountDto): Promise<Response> {
        const result = await this.accountService.createAccount(dto);
        return res.status(HttpStatus.OK).json(result)
    }

    @ApiBody({ type: SigninDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Post('signin')
    async signin(@Res() res: Response,@Body() dto:SigninDto): Promise<Response> {
        const result = await this.accountService.signin(dto);
        return res.status(HttpStatus.OK).json(result)
    }

    @ApiBody({ type: SigninDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Post('createPassword')
    async createPassword(@Res() res: Response,@Body() dto:SigninDto): Promise<Response> {
        const result = await this.accountService.createPassword(dto);
        return res.status(HttpStatus.OK).json(result)
    }

    @ApiBody({ type: ReLoginDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Post('reLogin')
    async reLogin(@Res() res: Response,@Body() dto:ReLoginDto): Promise<Response> {
        const result = await this.accountService.reLogin(dto);
        return res.status(HttpStatus.OK).json(result)
    }

    @ApiBody({ type: IsAccountExistDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Post('isExist')
    async isAccounExist(@Res() res: Response,@Body() dto:IsAccountExistDto): Promise<Response> {
        const result = await this.accountService.isAccountExist(dto);
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: UpdateAccountDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Put('')
    async updateAccount(@Req() req: any,@Res() res: Response,@Body() dto:UpdateAccountDto): Promise<Response> {
        const result = await this.accountService.updateAccount(dto,req.user.userId);
        return res.status(HttpStatus.OK).json(result)
    }


}
