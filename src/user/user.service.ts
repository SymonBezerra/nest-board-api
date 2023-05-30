import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ExistingUserException } from './exceptions/ExistingUserException';
import { UserNotFoundException } from './exceptions/UserNotFoundException';

@Injectable()
export class UserService {

  constructor (@InjectRepository(User) private repository: Repository<User>) {
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.repository.create(createUserDto);
    const userExists = await this.repository.findOne({ where: { name: createUserDto.name }});
    if (userExists) {
      throw new ExistingUserException ("There is already a User with this name!",
      HttpStatus.BAD_REQUEST);
    }
    return this.repository.save(user);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const user = await this.repository.findOne({ where: {id}});
    if (!user) {
      throw new UserNotFoundException (`There is no user with the ID ${id}`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async remove(id: number) {
    const user = await this.repository.findOne({ where: {id}});
    if (!user) {
      throw new UserNotFoundException (`There is no user with the ID ${id}`, HttpStatus.NOT_FOUND);
    }
    return this.repository.remove(user);
  }
}
