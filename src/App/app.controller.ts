import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/Main")
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get("/test")
  getTest(): string {
    return "This is a test endpoint!";
  }

  @Post("/test")
  createTest(){
    return "Test data created!";
  }

}
