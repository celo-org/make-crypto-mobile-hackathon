import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Account } from 'src/account/account.entity';
import { OrbitModule } from 'src/orbit/orbit.module';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction,Account]),OrbitModule],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
