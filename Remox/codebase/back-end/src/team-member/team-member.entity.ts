import { GenericEntity } from "../generic/generic.entity";
import { Team } from "../team/team.entity";
import { Column, Entity, Index, ManyToOne } from "typeorm";
import { TokenType } from "../transaction/transaction.entity";
import { Account } from "../account/account.entity";

@Entity({name:"teamMembers"})
@Index(['accountId','address'])
@Index(['teamId','accountId'])
export class TeamMember extends GenericEntity{
    @Column({type:'varchar',nullable:false})
    name:string;

    @Column({type:'varchar',nullable:false})
    address:string;

    @Column({ type: 'enum', default: TokenType.celo, enum: TokenType })
    currency:TokenType;

    @Column({type:'varchar',nullable:false})
    amount:string;

    @ManyToOne(()=>Team,team=>team.teamMembers,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    team:Team;

    @Column({ type: 'uuid', nullable: false })
    teamId: string;

    @ManyToOne(()=>Account,account=>account.teamMembers,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    account:Account;

    @Column({ type: 'uuid', nullable: false })
    accountId: string;
}