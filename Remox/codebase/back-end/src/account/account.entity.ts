import { Entity, Column, BeforeInsert, OneToMany } from "typeorm"
import { GenericEntity } from "../generic/generic.entity"
import bcrypt from "bcrypt"
import { InternalServerErrorException } from "@nestjs/common";
import { Custumer } from "../custumer/custumer.entity";
import { Team } from "../team/team.entity";
import { TeamMember } from "../team-member/team-member.entity";

@Entity({ name: "accounts" })
export class Account extends GenericEntity {

    @Column({ type: 'varchar', nullable: false })
    accountAddress: string;

    @OneToMany(() => Custumer, custumer => custumer.account, { cascade: true })
    custumers: Custumer[];

    @OneToMany(() => Team, team => team.account, { cascade: true })
    teams: Team[];

    @OneToMany(() => TeamMember, teamMember => teamMember.account, { cascade: true })
    teamMembers: TeamMember[];

    // @BeforeInsert()
    // async hashPassword(): Promise<void> {
    //     try {
    //         if (this.password) this.password = await bcrypt.hash(this.password, 10);
    //     } catch (error) {
    //         throw new InternalServerErrorException('There are some issiue in the hash')
    //     }
    // }
}