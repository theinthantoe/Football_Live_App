import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('list')
  findAll() {
    return this.usersService.find();
  }
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() userUpdateDto: UpdateUserDto) {
    return this.usersService.update(id, userUpdateDto);
  }
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
