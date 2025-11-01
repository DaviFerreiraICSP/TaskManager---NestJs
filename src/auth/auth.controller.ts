import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post()
    signIn(@Body() signIndto: SignInDto) {
        return this.authService.authenticate(signIndto)
    }

}
