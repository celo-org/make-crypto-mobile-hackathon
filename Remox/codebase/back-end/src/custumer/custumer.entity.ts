import { Account } from '../account/account.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { GenericEntity } from '../generic/generic.entity'

@Entity({ name: 'custumers' })
@Index(['address','accountId'])
export class Custumer extends GenericEntity {
    @Column({ type: "varchar", nullable: false })
    name: string

    @Column({ type: "varchar", nullable: false })
    address: string

    @ManyToOne(() => Account, account => account.custumers, { onDelete: "CASCADE",onUpdate:"CASCADE" })
    account: Account;

    @Column({ type: 'uuid', nullable: false })
    accountId: string;
}
