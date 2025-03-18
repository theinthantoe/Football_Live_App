import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateVersionControlDto } from './dto/create-version_control.dto';
import Messages from '../utils/message';

@Injectable()
export class VersionControlService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createVersionControlDto: CreateVersionControlDto) {
    try {
      const createdData = await this.databaseService.versionControl.create({
        data: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ios: createVersionControlDto.ios
            ? JSON.parse(JSON.stringify(createVersionControlDto.ios))
            : undefined,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          android: createVersionControlDto.android
            ? JSON.parse(JSON.stringify(createVersionControlDto.android))
            : undefined,
        },
      });

      return {
        status: HttpStatus.CREATED,
        message: Messages.created,
        data: createdData,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Error creating version control',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const data = await this.databaseService.versionControl.findMany();
    return {
      status: HttpStatus.OK,
      message: Messages.getAll,
      data,
    };
  }

  async findOne(id: string) {
    const data = await this.databaseService.versionControl.findUnique({
      where: { id },
    });

    if (!data) {
      throw new HttpException(Messages.notFound, HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      message: Messages.getOne,
      data,
    };
  }

  async update(id: string, updateData: Partial<CreateVersionControlDto>) {
    try {
      const updatedData = await this.databaseService.versionControl.update({
        where: { id },
        data: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ios: updateData.ios
            ? JSON.parse(JSON.stringify(updateData.ios))
            : undefined,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          android: updateData.android
            ? JSON.parse(JSON.stringify(updateData.android))
            : undefined,
        },
      });

      return {
        status: HttpStatus.OK,
        message: Messages.updated,
        data: updatedData,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Error creating version control',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.databaseService.versionControl.delete({ where: { id } });
      return {
        status: HttpStatus.OK,
        message: Messages.deleted,
        data: null,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Error deleting version control',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
