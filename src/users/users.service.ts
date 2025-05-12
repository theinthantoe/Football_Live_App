import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ChangePasswordByAdminDto, CreateUserDto } from 'src/users/dto/CreateUser.dto';
import Messages from 'src/utils/message';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const data = await this.databaseService.user.create({
        data: { ...createUserDto, password: hashedPassword },
      });
      return {
        status: HttpStatus.CREATED,
        message: Messages.created,
        data,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Error creating User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async find(query: any) {
    try {
      const filters: any = {};

      if (query.phoneNumber) {
        filters.phoneNumber = String(query.phoneNumber); // force string
      }

      if (query.name) {
        filters.name = {
          contains: query.name,
          mode: 'insensitive',
        };
      }

      const data = await this.databaseService.user.findMany({
        where: filters,
      });

      return {
        status: HttpStatus.OK,
        message: Messages.getAll,
        data,
      };
    } catch (error) {
      throw new HttpException(
        Messages.internalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.databaseService.user.findUnique({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        message: Messages.getOne,
        data,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        Messages.internalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findByemail(phoneNumber: string) {
    try {
      const data = await this.databaseService.user.findUnique({
        where: { phoneNumber },
      });
      return {
        status: HttpStatus.OK,
        message: Messages.getOne,
        data,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        Messages.internalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.databaseService.user.update({
        where: { id },
        data: updateUserDto,
      });
      return {
        status: HttpStatus.OK,
        message: Messages.updated,
        data,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        Messages.internalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: string) {
    try {
      const data = await this.databaseService.user.delete({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        message: Messages.deleted,
        data: data,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        Messages.internalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async changePasswordByAdmin(id: string, body: ChangePasswordByAdminDto) {
    const { newPassword, confirmPassword } = body;

    if (newPassword !== confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const data = await this.databaseService.user.update({
        where: { id },
        data: { password: hashedPassword },
      });
      return {
        status: HttpStatus.OK,
        message: 'Password updated successfully',
        data,
      };
    } catch (error) {
      throw new HttpException(
        Messages.internalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
