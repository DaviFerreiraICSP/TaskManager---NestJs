import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private readonly hashingService: HashingServiceProtocol
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
        
        return{
            id: user.id,
            user: user.user,
            email: user.email
        }

    }   


}
