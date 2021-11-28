import { Entity, Column } from "typeorm"
import { GenericEntity } from "../generic/generic.entity"

export enum TokenType {
    celo = 'celo',
    cUSD = 'cUSD',
    cEUR = 'cEUR',
    UBE = 'UBE',
    MOO = 'MOO',
    MOBI = 'MOBI',
    POOF = 'POOF'
}

export enum StableTokenType {
    cUSD = 'cUSD',
    cEUR = 'cEUR',
}

export enum AltTokenType{
    UBE = 'UBE',
    MOO = 'MOO',
    MOBI = 'MOBI',
    POOF = 'POOF'
}

@Entity({ name: "transactions" })
export class Transaction extends GenericEntity {
    @Column({ type: 'varchar', nullable: false })
    tranHash: string;

    @Column({ type: 'varchar', nullable: false })
    block: string;

    @Column({ type: 'varchar', nullable: false })
    gasUsed: string

    @Column({ type: 'varchar', nullable: false })
    from: string;

    @Column({ type: 'boolean', nullable: false })
    status: boolean

    @Column({ type: "varchar", nullable: false })
    to: string

    @Column({ type: 'varchar', nullable: false })
    value: string

    @Column({ type: 'enum', default: TokenType.celo, enum: TokenType })
    tokenType: TokenType
}