// admin.service.ts
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ChangePasswordDto, CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import Messages from 'src/utils/message';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class AdminService {
  constructor(private db: DatabaseService) {}

  async create(dto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const admin = await this.db.admin.create({
      data: { ...dto, password: hashedPassword },
    });
    return {
      status: HttpStatus.CREATED,
      message: Messages.created,
      data: admin,
    };
  }

  async findAll() {
    const data = await this.db.admin.findMany();
    return {
      status: HttpStatus.OK,
      message: Messages.getAll,
      data,
    };
  }

  async findByemail(email: string) {
    try {
      const data = await this.db.admin.findUnique({
        //@ts-ignore
        where: { email },
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

  async findOne(id: string) {
    const data = await this.db.admin.findUnique({ where: { id } });
    return {
      status: HttpStatus.OK,
      message: Messages.getOne,
      data,
    };
  }

  async update(id: string, dto: UpdateAdminDto) {
    return this.db.admin.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.db.admin.delete({ where: { id } });
  }
  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    try {
      if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
        throw new HttpException(
          'New password and confirm password do not match',
          HttpStatus.BAD_REQUEST,
        );
      }
      const admin = await this.db.admin.findUnique({
        where: { id },
        select: { password: true },
      });

      if (!admin || typeof admin.password !== 'string') {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      if (!admin) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }

      const isMatch = await bcrypt.compare(
        changePasswordDto.currentPassword,
        admin.password,
      );
      if (!isMatch) {
        throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
      }

      const hashedNewPassword = await bcrypt.hash(
        changePasswordDto.newPassword,
        10,
      );
      await this.db.admin.update({
        where: { id },
        data: { password: hashedNewPassword },
      });

      return {
        status: HttpStatus.OK,
        message: Messages.updated,
        data: null,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException(Messages.notFound, HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException(
        Messages.internalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
