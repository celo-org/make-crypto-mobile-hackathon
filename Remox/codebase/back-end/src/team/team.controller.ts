import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
import { PaginationQueryDto } from 'src/generic/paginationQuery';
import { CreateTeamDto, ParamDto } from './dto';
import { TeamService } from './team.service';

@ApiTags("Team")
@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) { }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: CreateTeamDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Post('create')
    async createTeam(@Res() res: Response, @Req() req: any, @Body() dto: CreateTeamDto):Promise<Response> {
        const result = await this.teamService.createTeam(req.user.userId,dto)
        return res.status(HttpStatus.OK).json(result)
    }
    
    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Get("byAccount")
    async getTeams(@Res() res:Response,@Req() req:any,@Query() {take,skip}:PaginationQueryDto):Promise<Response> {
        const result = await this.teamService.getTeams(req.user.userId,take,skip)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Get("/:id")
    async getTeam(@Res() res:Response,@Req() req:any,@Param() param: ParamDto,):Promise<Response> {
        const result = await this.teamService.getTeam(param.id,req.user.userId)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Get("byAccount/withMembers")
    async getTeamsWithMembers(@Res() res:Response,@Req() req:any,@Query() {take,skip}:PaginationQueryDto):Promise<Response> {
        const result = await this.teamService.getTeamsWithMembers(req.user.userId,take,skip)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Delete("/:id")
    async deleteTeam(@Res() res:Response,@Req() req:any,@Param() param:ParamDto):Promise<Response> {
        const result = await this.teamService.deleteTeam(req.user.userId,param.id)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: CreateTeamDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Patch('/:id')
    async updateAccount(@Req() req: any,@Res() res: Response,@Param() param:ParamDto,@Body() dto:CreateTeamDto): Promise<Response> {
        const result = await this.teamService.updateTeam(dto,req.user.userId,param.id);
        return res.status(HttpStatus.OK).json(result)
    }
}
