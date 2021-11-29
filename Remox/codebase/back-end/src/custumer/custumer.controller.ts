import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CustumerService } from './custumer.service';
import { ApiBody, ApiTags, ApiForbiddenResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { AddCustumerDto,ParamDto } from './dto';
import { PaginationQueryDto } from 'src/generic/paginationQuery';

@ApiTags('Custumer')
@Controller('custumer')
export class CustumerController {
    constructor(private custumerService: CustumerService) { }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type:AddCustumerDto  })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Post("create")
    async addCustumer(@Res() res:Response,@Req() req:any,@Body() dto:AddCustumerDto):Promise<Response> {
        const result = await this.custumerService.addCustumer(dto,req.user.userId)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Get("byAccount")
    async getCustumers(@Res() res:Response,@Req() req:any,@Query() {take,skip}:PaginationQueryDto):Promise<Response> {
        const result = await this.custumerService.getCustumers(req.user.userId,take,skip)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Delete("/:id")
    async deleteCustumer(@Res() res:Response,@Req() req:any,@Param() param:ParamDto):Promise<Response> {
        const result = await this.custumerService.deleteCustumer(req.user.userId,param.id)
        return res.status(HttpStatus.OK).json(result)
    }
}
