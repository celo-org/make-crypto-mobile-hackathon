import { Account } from '../account/account.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm'
import { GenericEntity } from '../generic/generic.entity'
import { TeamMember } from '../team-member/team-member.entity';

@Entity({ name: 'teams' })
@Index(['title','accountId'])
@Index(['accountId'])
export class Team extends GenericEntity {
    @Column({type:'varchar',nullable:false})
    title:string;

    @ManyToOne(()=>Account,account=>account.teams,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    account:Account;

    @Column({ type: 'uuid', nullable: false })
    accountId: string;

    @OneToMany(() => TeamMember, teamMember => teamMember.team, { cascade: true })
    teamMembers: TeamMember[];
}