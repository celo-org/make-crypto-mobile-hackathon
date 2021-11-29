import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/account.entity';
import { CustumerController } from './custumer.controller';
import { Custumer } from './custumer.entity';
import { CustumerService } from './custumer.service';

@Module({
  imports:[TypeOrmModule.forFeature([Custumer,Account])],
  controllers: [CustumerController],
  providers: [CustumerService]
})
export class CustumerModule {}
