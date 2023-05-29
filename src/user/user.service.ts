import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ExistingUserException } from './exceptions/ExistingUserException';

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
