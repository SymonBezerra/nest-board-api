import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({type: User})
  @ApiOperation({description: "Create a User inside the database"})
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
  @ApiOperation({description: "Find all Users inside the database"})
  @ApiCreatedResponse({type: User, isArray: true})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({description: "Find a User by its ID"})
  @ApiCreatedResponse({type: User})
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(+id);
    } catch (err){
      return { ... err };
    }
  }

  @Patch(":id")
  @ApiOperation({description: "Update a User by its ID"})
  @ApiCreatedResponse({type: User})
  update(@Param('id') id: string, updateUserDto: UpdateUserDTO) {
    try {
      return this.userService.update(+id, updateUserDto);
    } catch (err) {
      return { ... err };
    }
  }

  @Delete(':id')
  @ApiOperation({description: "Delete a User by its ID"})
  @ApiCreatedResponse({type: User})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
