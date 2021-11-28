import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt"
import path from 'path';
require('dotenv').config({path:path.join(__dirname, "..","..", ".env")});

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: true,
          secretOrKey: process.env.JWT_SECRET_KEY,
        });
      }
    
      async validate(payload: any) {
        return payload;
      }
}