import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private readonly hashingService: HashingServiceProtocol,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService
    ){}


    async authenticate(signIndto: SignInDto){
        
        const user = await this.prisma.user.findFirst({
            where:{
                email: signIndto.email
            }
        })

        if(!user){
            throw new HttpException("User/Password is incorrect", HttpStatus.UNAUTHORIZED)
        }

        const passwordIsValid = await this.hashingService.compare(signIndto.password, user.passwordHash)
    
        if(!passwordIsValid){
            throw new HttpException("User/Password is incorrect", HttpStatus.UNAUTHORIZED)
        }

        const token = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
            },
            {
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.jwtTtl,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            }
        )

        return{
            id: user.id,
            email: user.email,
            user: user.user,
            token: token,

        }

    }   


}
