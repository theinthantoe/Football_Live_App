import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSplashBannerDto } from './dto/create-splash_banner.dto';
import Messages from 'src/utils/message';
import { UpdateSplashBannerDto } from 'src/splash_banner/dto/update-splash_banner.dto';

@Injectable()
export class SplashBannerService {
  constructor(private prisma: DatabaseService) {}

  async createBanner(dto: CreateSplashBannerDto) {
    const data = await this.prisma.splashBanner.create({
      //@ts-ignore
      data: dto,
    });

    return {
      status: HttpStatus.CREATED,
      message: Messages.created,
      data,
    };
  }

  async getBanners(type?: string) {
    const data = await this.prisma.splashBanner.findMany({
      //@ts-ignore
      where: { type },
    });
    return {
      status: HttpStatus.OK,
      message: Messages.getAll,
      data,
    };
  }

  // async getBanner(id: string) {
  //   const data = await this.prisma.splashBanner.findUnique({
  //     where: { id },
  //   });
  //
  //   if (!data) throw new NotFoundException('Banner not found');
  //
  //   return {
  //     status: HttpStatus.OK,
  //     message: Messages.getOne,
  //     data,
  //   };
  // }

  async updateBanner(id: string, dto: UpdateSplashBannerDto) {
    const exists = await this.prisma.splashBanner.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Banner not found');

    const updated = await this.prisma.splashBanner.update({
      where: { id },
      //@ts-ignore
      data: dto,
    });

    return {
      status: HttpStatus.OK,
      message: Messages.updated,
      data: updated,
    };
  }

  async deleteBanner(id: string) {
    await this.prisma.splashBanner.delete({ where: { id } });

    return {
      status: HttpStatus.OK,
      message: Messages.deleted,
      data: null,
    };
  }

  // async getBannersByType(type: string) {
  //   const data = await this.prisma.splashBanner.findMany({
  //     where: { type },
  //   });
  //
  //   return {
  //     status: HttpStatus.OK,
  //     message: 'Banners filtered by type',
  //     data,
  //   };
  // }
}
