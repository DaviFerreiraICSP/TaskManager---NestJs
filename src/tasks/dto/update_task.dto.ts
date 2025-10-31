import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


/* DTO is a Data Transfer Object used to define the shape of data for creating a task */
export class UpdateTaskDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @IsNotEmpty({ message: 'Name is required' })
    @MaxLength(50, { message: 'Name must be at most 50 characters long' })
    readonly title?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Description is required' })
    @IsString({ message: 'Description must be a string' })
    @MaxLength(500, { message: 'Description must be at most 500 characters long' })
    readonly description?: string
    
    @IsOptional()
    @IsBoolean({ message: 'Status must be a boolean value' })
    readonly completed?: boolean;
}