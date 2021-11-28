import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrbitModule } from 'src/orbit/orbit.module';
import { AccountController } from './account.controller';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import path from 'path'
require('dotenv').config({path:path.join(__dirname, "..","..", ".env")});


@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET_KEY
  }),
  TypeOrmModule.forFeature([Account]),OrbitModule],
  controllers: [AccountController],
  providers: [AccountService,JwtStrategy]
})
export class AccounModule { }
