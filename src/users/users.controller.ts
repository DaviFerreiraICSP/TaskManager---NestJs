import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/upddate_user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token-guards';
import { REQUEST_TOKEN_PAYLOAD_NAME } from 'src/auth/common/constants';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(":id")
    findOneuser(@Param('id', ParseIntPipe) id: number) {

        console.log('TOken Test', process.env.TOKEN_KEY)

        return this.usersService.findOneUser(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(AuthTokenGuard)
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request, ) {

        console.log(req[REQUEST_TOKEN_PAYLOAD_NAME])

        return this.usersService.update(id, updateUserDto)
    }

    @UseGuards(AuthTokenGuard)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)
    }
    
} 