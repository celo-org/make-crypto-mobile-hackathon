import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"

export class RefreshTokenDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string
}
