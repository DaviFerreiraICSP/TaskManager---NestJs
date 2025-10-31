import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    
    @IsString({ message: 'User must be a string' })
    @MinLength(3, { message: 'User must be at least 3 characters long' })
    @MaxLength(20, { message: 'User must be at most 20 characters long' })
    @IsNotEmpty({ message: 'User is required' })
    readonly user: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    readonly email: string;

    @IsString({ message: 'Password must be a string' })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, { message: 'Password is not strong enough' })
    readonly password: string;
}