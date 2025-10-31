import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/common/filters/exception-filters';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter
    }
  ],
})
export class UsersModule {}
