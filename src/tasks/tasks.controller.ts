import { Controller, Get, Param, Post, Query, Body, Patch, Delete, ParseIntPipe, UseInterceptors } from '@nestjs/common'; 
import { TasksService } from './tasks.service'; 
import { CreateTaskDto } from './dto/create_task.dto';
import { UpdateTaskDto } from './dto/update_task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.intercepter';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

@Controller('tasks')
@UseInterceptors(LoggerInterceptor)
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get() // Get all tasks | Get means to retrieve data from the server
    @UseInterceptors(LoggerInterceptor)
    @UseInterceptors(AddHeaderInterceptor)
    FindAll(@Query() paginationDto: PaginationDto) { // Optional limit query parameter
        return this.taskService.findAll(paginationDto); // Call service to get all tasks
    }

    @Get(":id") 
    FindOne(@Param("id", ParseIntPipe) id: number) { 
        console.log(id);
        return this.taskService.findOneTask(id); // Call service to find a task by ID
    }

    @Post()
    @UseInterceptors(BodyCreateTaskInterceptor) 
    createTask(@Body() createTaskDto: CreateTaskDto) { // Get body from request
        const body = createTaskDto;
        return this.taskService.create(body);
    }

    @Patch(":id") // Update a task
    updateTask(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) { // Get ID from URL and body from request
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(":id") // Delete a task | Delete means to remove data from the server
    deleteTask(@Param("id") id: string) { // Get ID from URL
        return this.taskService.delete(id);
    }
}
