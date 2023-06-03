import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiTags("task")
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({type: Task})
  @ApiOperation({description: "Create a Task, linking with the User name"})
  create(@Body() createTaskDto: CreateTaskDto) {
    try{
      return this.taskService.create(createTaskDto);
    } catch (err) {
      return { ... err };
    }
  }

  @Get()
  @ApiOperation({description: "Return all Tasks inside the database"})
  @ApiCreatedResponse({ type: Task, isArray: true })
  findAll () {
    return this.taskService.findAll();
  }

  @Get("/name")
  @ApiOperation({description: "Find a Task by its name"})
  @ApiCreatedResponse({ type: Task, isArray: true })
  findByName(@Query("name") name: string) {
    try {
      return this.taskService.findByName(name);
    } catch (err) {
      return { ... err};
    }
  }

  @Get("/user")
  @ApiCreatedResponse({ type: Task, isArray: true })
  @ApiOperation({description: "Find all Tasks of a given User by its name"})
  findAllByUser(@Query("name") name: string) {
    try {
      return this.taskService.findAllByUserName(name);
    } catch (err) {
      return { ... err };
    }
  }

  @Get(":id")
  @ApiCreatedResponse({type: Task})
  @ApiOperation({description: "Find a Task by its ID"})
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
  @ApiCreatedResponse({type: Task})
  @ApiOperation({description: "Update a Task by its name"})
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({description: "Delete a Task by its ID"})
  @ApiCreatedResponse({type: Task})
  remove(@Param('id') id: string) {
    try {
      return this.taskService.remove(+id);
    } catch (err) {
      return { ... err };
    }
  }
}
