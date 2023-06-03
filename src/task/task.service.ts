import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TaskNotFoundException } from './exceptions/TaskNotFoundException';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserNotFoundException } from 'src/user/exceptions/UserNotFoundException';

@Injectable()
export class TaskService {

  constructor (@InjectRepository(Task) private taskRepository: Repository<Task>,
  @InjectRepository(User) private userRepository: Repository<User>) {
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.name = createTaskDto.name;
    task.description = createTaskDto.description;
    const user = await this.userRepository.findOne({ where: {name: createTaskDto.userName}});
    if (!user) {
      throw new UserNotFoundException(`There is no user named '${createTaskDto.userName}'`,
      HttpStatus.BAD_REQUEST);
    }
    task.user = user;
    return this.taskRepository.save(task);
  }

  async findAll () {
    return this.taskRepository.find();
  }

  async findAllByUserName(userName: string) {
    const user = await this.userRepository.findOne({ where: { name: userName }});
    if (!user) {
      throw new UserNotFoundException(`There is no user named ${userName}`,
      HttpStatus.BAD_REQUEST);
    }
    const userId = user.id;
    const tasks = this.taskRepository.createQueryBuilder("task")
    .leftJoinAndSelect("task.user", "user")
    .where('task.userId = :userId', { userId }).getMany();
    return tasks;
  }

  async findByName (name: string) {
    const tasks = await this.taskRepository.find({ where: { name }});
    if (tasks.length === 0) {
      throw new TaskNotFoundException ("There are no Tasks with this name!", HttpStatus.BAD_REQUEST);
    }
    return tasks;
  }

  async findById (id: number) {
    const task = await this.taskRepository.findOne({ where: { id }});
    if (!task) {
      throw new TaskNotFoundException("There is no task with this ID !", HttpStatus.BAD_REQUEST);
    }
    return task;
  }

  // async findByUserId(userId: number) {
  //   const user = await this.userRepository.findOne({ where: { id: userId}})

  //   if (!user) {
  //     throw new UserNotFoundException("There is no User with this ID!", HttpStatus.BAD_REQUEST);
  //   }
  //   const tasks = await this.taskRepository.find({ where: { user} });

  //   return tasks;
  // }

  async update (id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({ where: {id}});
    if (!task) {
      throw new TaskNotFoundException (`There is no Task with the ID ${id}`, HttpStatus.NOT_FOUND);
    }
    return this.taskRepository.save({ ...task, ...updateTaskDto });
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({ where: { id }});
    if (!task) {
      throw new TaskNotFoundException("There is no task with this ID !", HttpStatus.BAD_REQUEST);
    }
    return this.taskRepository.remove(task);
  }
}
