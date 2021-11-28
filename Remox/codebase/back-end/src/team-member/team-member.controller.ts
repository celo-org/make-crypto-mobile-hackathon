import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
import { PaginationQueryDto } from '../generic/paginationQuery';
import { CreateTeamMemberDto, ParamDto, UpdateTeamMemberDto } from './dto';
import { TeamMemberService } from './team-member.service';

@ApiTags('Team member')
@Controller('team-member')
export class TeamMemberController {
    constructor(private teamMemberService: TeamMemberService) { }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: CreateTeamMemberDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Post("add")
    async addMember(@Res() res: Response, @Req() req: any, @Body() dto: CreateTeamMemberDto): Promise<Response> {
        const result = await this.teamMemberService.addMember(dto, req.user.userId)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Get("byTeam/:id")
    async getMembersByTeam(@Res() res: Response, @Req() req: any, @Param() param: ParamDto, @Query() { take, skip }: PaginationQueryDto): Promise<Response> {
        const result = await this.teamMemberService.getMembersByTeam(param.id, req.user.userId, take, skip)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Get("/:id")
    async getMember(@Res() res: Response, @Req() req: any, @Param() param: ParamDto,): Promise<Response> {
        const result = await this.teamMemberService.getMember(param.id, req.user.userId)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Delete("/:id")
    async deleteMember(@Res() res: Response, @Req() req: any, @Param() param: ParamDto): Promise<Response> {
        const result = await this.teamMemberService.removeMember(param.id, req.user.userId)
        return res.status(HttpStatus.OK).json(result)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: UpdateTeamMemberDto })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('JWT-auth')
    @Put('')
    async updateMember(@Req() req: any, @Res() res: Response, @Body() dto: UpdateTeamMemberDto): Promise<Response> {
        const result = await this.teamMemberService.updateMember(dto, req.user.userId);
        return res.status(HttpStatus.OK).json(result)
    }
}
