import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
