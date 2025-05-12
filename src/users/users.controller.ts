import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordByAdminDto, CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('list')
  findAll(@Query() query: any) {
    return this.usersService.find(query);
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
  @Patch('change-password/:id')
  changePasswordByAdmin(
    @Param('id') id: string,
    @Body() body: ChangePasswordByAdminDto,
  ) {
    return this.usersService.changePasswordByAdmin(id, body);
  }

}
