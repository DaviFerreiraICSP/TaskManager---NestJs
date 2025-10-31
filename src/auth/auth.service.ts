import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { PrismaService } from 'src/prisma/prisma.service';
import * as qrcode from 'qrcode';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async generate2FASecret(email: string) {
        const secret = authenticator.generateSecret();

        const otpauthUrl = authenticator.keyuri(email, 'MyNestApp', secret);

        const qrCode = await qrcode.toDataURL(otpauthUrl);

        await this.prisma.user.update({
        where: { email },
        data:{ 
             twoFactorSecret: secret 
            },

        });

        return {
            qrCode, // you can show this in frontend
            secret, // optional (for testing)
        };
    }

    async verify2FA(email: string, token: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        })
    
        if (!user || !user.twoFactorSecret) {
            return false;
        }

        return authenticator.verify({
            token,
            secret: user.twoFactorSecret,
        });
    }

}

