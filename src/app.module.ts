import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
