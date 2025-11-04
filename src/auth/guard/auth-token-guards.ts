import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import type { ConfigType } from "@nestjs/config";
import jwtConfig from "../config/jwt.config";
import { REQUEST_TOKEN_PAYLOAD_NAME } from "../common/constants";


@Injectable()
export class AuthTokenGuard implements CanActivate{

    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ){ }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenHeader(request)

        if(!token){
            throw new UnauthorizedException("Token not found.")
        }

        try{
            const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration)

            request[REQUEST_TOKEN_PAYLOAD_NAME] = payload

        }catch(err){
            console.log(err);
            throw new UnauthorizedException("Access denied")
        }

        return true;
    }

    extractTokenHeader(request: Request) {
        const authorization = request.headers?.authorization 

        if(!authorization || typeof authorization !== "string"){
            return
        }

        return authorization.split(' ')[1];
    }
}