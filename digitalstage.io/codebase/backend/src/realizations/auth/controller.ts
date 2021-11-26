import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ThrottlerGuard } from "@nestjs/throttler"
import { RequestUserInterface } from "src/abstractions/auth/request"
import { User } from "./decorator"
import { RefreshTokenDTO } from "./dto"
import { JwtGuard } from "./guard"
import { NestAuthService } from "./service"

@ApiTags("Auth")
@Controller("/auth")
export class AuthController {
  constructor(private authService: NestAuthService) {}

  @ApiOperation({ summary: "Refresh tokens pair" })
  @UseGuards(ThrottlerGuard)
  @Post("refresh")
  async refreshToken(@Body() data: RefreshTokenDTO) {
    return await this.authService.refreshAuthTokens(data.token)
  }

  @ApiOperation({ summary: "Logout and delete refreshToken" })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post("logout")
  async logout(@User() user: RequestUserInterface) {
    return await this.authService.logout(user.refreshToken)
  }
}
