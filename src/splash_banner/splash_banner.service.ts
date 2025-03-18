import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import Messages from 'src/utils/message';

@Injectable()
export class SplashBannerService {
  constructor(private databaseServices: DatabaseService) {}

  async createBanner(file: { buffer: Buffer; mimetype: string }) {
    if (!file) {
      throw new NotFoundException('No banner found');
    }

    // Convert image file to Base64
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    // Save to database
    const data = await this.databaseServices.splashBanner.create({
      data: { image: base64Image },
    });

    return {
      status: HttpStatus.OK,
      message: Messages.created,
      data,
    };
  }
  async getBanners() {
    const data = await this.databaseServices.splashBanner.findMany();
    return {
      status: HttpStatus.OK,
      message: Messages.getAll,
      data,
    };
  }
  async getBanner(id: string) {
    const data = await this.databaseServices.splashBanner.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException('No banner found');
    }
    return {
      status: HttpStatus.OK,
      message: Messages.getOne,
      data,
    };
  }
  async updateBanner(id: string, file: { buffer: Buffer; mimetype: string }) {
    const existingFile = await this.databaseServices.splashBanner.findUnique({
      where: { id },
    });
    if (!existingFile) {
      throw new NotFoundException('No banner found');
    }
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const updatedBanner = await this.databaseServices.splashBanner.update({
      where: { id },
      data: {
        image: base64Image,
      },
    });
    return {
      status: HttpStatus.OK,
      message: Messages.updated,
      data: updatedBanner,
    };
  }
  async deleteBanner(id: string) {
    await this.databaseServices.splashBanner.delete({
      where: { id },
    });
    return {
      status: HttpStatus.OK,
      message: Messages.deleted,
      data: null,
    };
  }
}
