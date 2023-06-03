import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    try{
      return this.taskService.create(createTaskDto);
    } catch (err) {
      return { ... err };
    }
  }

  @Get()
  findAll () {
    return this.taskService.findAll();
  }

  @Get("/name")
  findByName(@Query("name") name: string) {
    try {
      return this.taskService.findByName(name);
    } catch (err) {
      return { ... err};
    }
  }

  @Get("/user")
  findAllByUser(@Query("name") name: string) {
    try {
      return this.taskService.findAllByUserName(name);
    } catch (err) {
      return { ... err };
    }
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    try {
      return this.taskService.findById(+id);
    } catch (err) {
      return { ... err };
    }
  }

  // @Get("user/:id")
  // findByUserId(@Param('id') id: string) {
  //   try {
  //     return this.taskService.findByUserId(+id);
  //   } catch (err) {
  //     return { ... err };
  //   }
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.taskService.remove(+id);
    } catch (err) {
      return { ... err };
    }
  }
}
