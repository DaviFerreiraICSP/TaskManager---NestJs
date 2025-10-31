export class Task { // Task entity definition
  id: number; 
  title: string;
  description: string;
  completed: boolean; 
  createdAt?: Date;
} // Represents a task with id, name, description, and completion status