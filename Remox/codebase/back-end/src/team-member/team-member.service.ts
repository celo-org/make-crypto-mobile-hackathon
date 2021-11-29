import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../team/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto';
import { TeamMember } from './team-member.entity';
import Web3 from 'web3'
import { escaper } from '../utils/html-escaper';
import { Provider } from '../blockchain/provider';

@Injectable()
export class TeamMemberService {

    private web3: Web3;

    constructor(
        @InjectRepository(TeamMember) private readonly teamMemberRepo: Repository<TeamMember>,
        @InjectRepository(Team) private readonly teamRepo: Repository<Team>
    ) {

        const provider = new Provider('https://forno.celo.org')
        this.web3 = provider.web3;
    }


    async addMember(dto: CreateTeamMemberDto, accountId: string) {
        try {
            const isAddressExist = this.web3.utils.isAddress(dto.address);
            if (!isAddressExist) throw new HttpException("There is not any wallet belong this address", HttpStatus.BAD_REQUEST);

            const team = await this.teamRepo.findOne({ id: dto.teamId })
            if (!team) throw new HttpException("There is not team with this id", HttpStatus.BAD_REQUEST);
            else if (team.accountId != accountId) throw new HttpException("This team doesn't belong you", HttpStatus.BAD_REQUEST);

            const isMemberExist = await this.teamMemberRepo.findOne({ accountId, address: dto.address });
            if (isMemberExist) throw new HttpException("This address already exist in your teams", HttpStatus.BAD_REQUEST);

            const newMember = this.teamMemberRepo.create({ ...dto, accountId })
            return await this.teamMemberRepo.save(newMember);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getMembersByTeam(teamId: string, accountId: string, take: number = 10, skip: number = 0) {
        try {
            const [members, total] = await this.teamMemberRepo.findAndCount({
                where: { teamId, accountId },
                order: { 'created_at': "DESC" },
                select: ['id', 'address', 'amount', 'currency', 'name'],
                take, skip
            })

            return { members, total }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getMember(memberId: string, accountId: string) {
        try {
            const member = await this.teamMemberRepo.findOne({ accountId, id: memberId })
            if (!member) throw new HttpException("There is not any member belong this account", HttpStatus.BAD_REQUEST);

            return { ...member }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async removeMember(memberId: string, accountId: string) {
        try {
            const member = await this.teamMemberRepo.findOne(memberId)
            if (!member) throw new HttpException("There is not member with this id", HttpStatus.BAD_REQUEST);
            else if (member.accountId != accountId) throw new HttpException("This member doesn't belong you", HttpStatus.BAD_REQUEST);

            await this.teamMemberRepo.remove(member)
            return { message: 'Deleted successfully' }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateMember(dto: UpdateTeamMemberDto, accountId: string) {
        Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key])
        const updates = Object.keys(dto);
        try {
            const currentMember = await this.teamMemberRepo.findOne(dto.id)
            if (!currentMember) throw new HttpException("There is not member with this id", HttpStatus.BAD_REQUEST);
            else if (currentMember.accountId != accountId) throw new HttpException("This member doesn't belong you", HttpStatus.BAD_REQUEST);

            if (updates.length == 0) throw new HttpException("Please fill any form", HttpStatus.NOT_FOUND)

            if (dto.address) {
                const isAddressExist = this.web3.utils.isAddress(dto.address);
                if (!isAddressExist) throw new HttpException("There is not any wallet belong this address", HttpStatus.BAD_REQUEST);
            }

            if (dto.teamId) {
                const isTeamExist = this.teamRepo.findOne(dto.teamId)
                if (!isTeamExist) throw new HttpException("There is not any team belong this id", HttpStatus.BAD_REQUEST);
            }

            updates.forEach(item => currentMember[item] = escaper(dto[item]))
            return await this.teamMemberRepo.save(currentMember)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
