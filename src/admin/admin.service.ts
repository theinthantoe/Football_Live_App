// admin.service.ts
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import Messages from 'src/utils/message';

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
      message: 'Admin created',
      data: admin,
    };
  }

  async findAll() {
    return this.db.admin.findMany();
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
    return this.db.admin.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateAdminDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    return this.db.admin.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.db.admin.delete({ where: { id } });
  }
}
