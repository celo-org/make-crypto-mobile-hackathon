import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { escaper } from '../utils/html-escaper';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
    constructor(@InjectRepository(Team) private readonly teamRepo: Repository<Team>) { }

    async createTeam(accountId: string, dto: CreateTeamDto) {
        try {
            const isExist = await this.teamRepo.findOne({ title: dto.title, accountId })
            if (isExist) throw new HttpException("You already use this title", HttpStatus.BAD_REQUEST);

            const newTeam = this.teamRepo.create({ ...dto, accountId })
            return await this.teamRepo.save(newTeam)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTeam(teamId: string, accountId: string) {
        try {
            const team = await this.teamRepo.findOne({ accountId, id: teamId })
            if (!team) throw new HttpException("There is not any team belong this account", HttpStatus.BAD_REQUEST);

            return { ...team }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTeams(accountId: string, take: number = 10, skip: number = 0) {
        try {
            const [teams, total] = await this.teamRepo.createQueryBuilder('teams')
                .select(['teams.id', 'teams.title'])
                .leftJoinAndSelect('teams.teamMembers', 'teamMembers')
                .loadRelationCountAndMap('teams.teamMembers', 'teams.teamMembers')
                .where('teams.accountId= :accountId', { accountId })
                .take(take)
                .skip(skip)
                .orderBy('teams.title', 'ASC')
                .getManyAndCount();

            return { teams, total }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async isTeamNamExist(accountId: string, teamName: string) {
        try {
            const team = await this.teamRepo.findOne({ accountId, title: teamName })
            let result = team ? true : false;
            return { result }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTeamsWithMembers(accountId: string, take: number = 10, skip: number = 0) {
        try {

            const [teams, total] = await this.teamRepo.createQueryBuilder('teams')
                .leftJoinAndSelect('teams.teamMembers', 'teamMembers',)
                .loadRelationCountAndMap('teams.teamMemberCount', 'teams.teamMembers')
                .where('teams.accountId= :accountId', { accountId })
                .select(['teams.id', 'teams.title', 'teamMembers.id', 'teamMembers.name', 'teamMembers.address', 'teamMembers.currency', 'teamMembers.amount', 'teamMembers.created_at'])
                .take(take)
                .skip(skip)
                .orderBy('teamMembers.created_at', "ASC")
                .orderBy('teams.title', 'ASC')
                .getManyAndCount();

            return { teams, total }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateTeam(dto: CreateTeamDto, accountId: string, teamId: string) {
        try {
            const currentTeam = await this.teamRepo.findOne({ id: teamId, accountId });
            if (!currentTeam) throw new HttpException("There is no team with this property", HttpStatus.BAD_REQUEST);
            
            const result =  await this.isTeamNamExist(accountId,dto.title)
            if(result) throw new HttpException("You already use this team name", HttpStatus.BAD_REQUEST);

            currentTeam["title"] = escaper(dto.title)
            return await this.teamRepo.save(currentTeam)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteTeam(accountId: string, teamId: string) {
        try {
            const team = await this.teamRepo.findOne({ accountId, id: teamId })
            if (!team) throw new HttpException("There is no team with this property", HttpStatus.BAD_REQUEST);
            await this.teamRepo.remove(team)
            return { message: 'Deleted successfully' }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
