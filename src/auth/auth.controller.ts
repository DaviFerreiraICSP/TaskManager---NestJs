import { Body, Controller, Post, } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private twoFactorAuthService: AuthService) {}

    @Post('Generate')
    async generate(@Body('email')email: string){
        return this.twoFactorAuthService.generate2FASecret(email);
    }

    @Post('Verify')
    async verify(@Body() body: { email: string; token: string }) {
        const isValid = await this.twoFactorAuthService.verify2FA(body.email, body.token);
        return { valid: isValid };
    }
}
