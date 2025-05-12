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
      // Retrieve the existing data first
      const existingData = await this.databaseService.versionControl.findUnique(
        {
          where: { id },
        },
      );

      if (!existingData) {
        throw new HttpException(Messages.notFound, HttpStatus.NOT_FOUND);
      }

      // Type casting to ensure correct type for ios and android
      const iosData = existingData.ios as
        | {
            title: string;
            slogan: string;
            version: string;
            buildNumber: string;
            appStoreLink: string;
          }
        | undefined;
      const androidData = existingData.android as
        | {
            title: string;
            slogan: string;
            version: string;
            buildNumber: string;
            playStoreLink: string;
          }
        | undefined;

      // Create a new object for the updated data
      const updatedData = {
        ios: iosData ?? {}, // Ensure it's an empty object if null or undefined
        android: androidData ?? {}, // Ensure it's an empty object if null or undefined
      };

      // If updateData.ios is provided, replace the existing ios data
      if (updateData.ios) {
        updatedData.ios = {
          title: updateData.ios.title ?? iosData?.title,
          slogan: updateData.ios.slogan ?? iosData?.slogan,
          version: updateData.ios.version ?? iosData?.version,
          buildNumber: updateData.ios.buildNumber ?? iosData?.buildNumber,
          appStoreLink: updateData.ios.appStoreLink ?? iosData?.appStoreLink,
        };
      }

      // If updateData.android is provided, replace the existing android data
      if (updateData.android) {
        updatedData.android = {
          title: updateData.android.title ?? androidData?.title,
          slogan: updateData.android.slogan ?? androidData?.slogan,
          version: updateData.android.version ?? androidData?.version,
          buildNumber:
            updateData.android.buildNumber ?? androidData?.buildNumber,
          playStoreLink:
            updateData.android.playStoreLink ?? androidData?.playStoreLink,
        };
      }

      // Debugging: Log the updated data before saving to DB
      console.log(
        'Updated Data Before DB Save:',
        JSON.stringify(updatedData, null, 2),
      );

      // Perform the update
      const updatedVersionControl =
        await this.databaseService.versionControl.update({
          where: { id },
          data: {
            ios: updatedData.ios ?? undefined, // Ensure it's not null or undefined when updating
            android: updatedData.android ?? undefined, // Ensure it's not null or undefined when updating
          },
        });

      return {
        status: HttpStatus.OK,
        message: Messages.updated,
        data: updatedVersionControl,
      };
    } catch (error) {
      console.error('Error during update:', error); // Log any error
      throw new HttpException(
        'Error updating version control',
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
