import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/upddate_user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { UpdateTaskDto } from 'src/tasks/dto/update_task.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private readonly hashingService: HashingServiceProtocol,) {}
    
    async findOneUser(id: number) {
        const user = await this.prisma.user.findFirst({
            where: { id },
            select: {
                id: true,
                email: true,
                user: true,
                Task: true
            }
        });
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async createUser(createUserDto: CreateUserDto) { 
        try{
            
            const passwordHash = await this.hashingService.hash(createUserDto.password)

            const user = await this.prisma.user.create({
                data:{
                    user: createUserDto.user,
                    email: createUserDto.email,
                    passwordHash: passwordHash,
                },
                select: {
                    id: true,
                    user: true,
                    email: true,
                }
            })

        }catch(err){
            console.log(err);
            throw new HttpException('Fail to create a new user', HttpStatus.BAD_REQUEST)
        }
    }

    async deleteUser(id: number){
        try{

            const user = await this.prisma.user.findFirst({
                where: {
                    id: id,
                }
            })

            if (!user) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
            }

            await this.prisma.user.delete({
                where: { id }
            });

            return{
                message: 'User deleted successfully '
            };

        }catch(err){
            console.log(err) 
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }

    }

    async update(id: number, updateUserDto: UpdateUserDto){
        try{

           const user = await this.prisma.user.findFirst({
                where: {
                    id: id,
                },
            })

            if (!user){
             throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
            }

            const dataUser: { user?: string, passwordHash?: string} = {user: updateUserDto.user,}
            
            if(updateUserDto?.password){
                const passwordHash = await this.hashingService.hash(updateUserDto?.password)
                dataUser['passwordHash'] = passwordHash
            }

            const updateUser = await this.prisma.user.update({
                where:{
                    id: user.id,
                },
                data:{
                    user: dataUser?.user,
                    passwordHash: dataUser?.passwordHash ? dataUser?.passwordHash : user.passwordHash,
                    email: updateUserDto?.email ? updateUserDto.email : user.email
                },
                select:{
                    id: true,
                    user: true,
                    email: true,
                }
            })

            return updateUser;

        }catch(err){
            console.log(err)
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }
        
}


}

