import { HttpException, HttpStatus, Injectable } from '@nestjs/common'; // Import Injectable decorator from NestJS
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create_task.dto';
import { UpdateTaskDto } from './dto/update_task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}
    
    async findAll(paginationDto?: PaginationDto) {
        const { limit = 10, offset = 0} = paginationDto || {};

        return await this.prisma.task.findMany({
            take: limit,
            skip: offset,
            orderBy: { createdAt: 'desc' }
        });
    }

    async findOneTask(id: number) {
        const task = await this.prisma.task.findFirst({
            where: { id }
        });

        if (!task) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return task;
    } 

    async create(createTaskDto: CreateTaskDto) { 
        try{
            await this.prisma.task.create({
                data: {
                    title: createTaskDto.title,
                    description: createTaskDto.description,
                    completed: false,
                    userId: createTaskDto.userId
                }
            });
        }catch(err){
            throw new HttpException('Erro', HttpStatus.BAD_REQUEST)
        }

        return { message: 'New Task Created!'}
    }

    async update(id: string, updateTaskDto: UpdateTaskDto) {
        try {
            const task = await this.prisma.task.update({
                where: { id: Number(id) },
                data: {
                    title: updateTaskDto.title,
                    description: updateTaskDto.description,
                    completed: updateTaskDto.completed
                }
            });
            
            return task;
        } catch (error) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: string) {
        try {
            await this.prisma.task.delete({
                where: { id: Number(id) }
            });
            
            return {
                message: 'Task deleted successfully'
            };
        } catch (error) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

    }

}

