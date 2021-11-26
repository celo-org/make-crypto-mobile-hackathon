import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "./entity"
import { UserStorage } from "./storage"

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserStorage],
  exports: [UserStorage],
})
export class UserModule {}
