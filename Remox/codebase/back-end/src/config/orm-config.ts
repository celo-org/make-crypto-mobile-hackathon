import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path  from 'path';
require('dotenv').config({path:path.join(__dirname, "..","..", ".env")});


export const devConfig:TypeOrmModuleOptions = {
    type:'postgres',
    host:process.env.POSTGRES_HOST,
    port:parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database:process.env.POSTGRES_DATABASE,
    entities: ['**/*.entity{.ts}'],
    autoLoadEntities: true,
    synchronize: true,

}
export const prodConfig:TypeOrmModuleOptions = {
    type:'postgres',
    url:process.env.POSTGRES_URI,
    entities: ['**/*.entity{.ts}'],
    autoLoadEntities: true,
    synchronize: true,
    ssl:true
}