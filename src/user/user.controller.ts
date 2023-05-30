import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const response = this.userService.create(createUserDto);
      return response;
    }
    catch (err) {
      return { ... err};
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(+id);
    } catch (err){
      return { ... err };
    }
  }

  @Patch(":id")
  update(@Param('id') id: string, updateUserDto: UpdateUserDTO) {
    try {
      return this.userService.update(+id, updateUserDto);
    } catch (err) {
      return { ... err };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
