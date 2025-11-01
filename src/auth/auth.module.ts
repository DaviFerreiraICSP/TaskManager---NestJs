import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';

//Turn into a global module. 
@Global() 
@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: HashingServiceProtocol,
            useClass: BcryptService
        },
        AuthService
    ]
    ,
    exports: [HashingServiceProtocol],
    controllers: [AuthController]
})
export class AuthModule { }
