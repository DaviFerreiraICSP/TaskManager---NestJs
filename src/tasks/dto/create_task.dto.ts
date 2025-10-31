import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsNumber } from "class-validator";

/* DTO is a Data Transfer Object used to define the shape of data for creating a task */
export class CreateTaskDto {

    @IsString({ message: 'Title must be a string' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @IsNotEmpty({ message: 'Title is required' })
    readonly title: string;
    
    @IsString({ message: 'Description must be a string' })
    @MaxLength(500, { message: 'Description must be at most 500 characters long' })
    @IsNotEmpty({ message: 'Description is required' })
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;
} 
