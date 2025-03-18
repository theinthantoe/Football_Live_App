import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SplashBannerService } from './splash_banner.service';
import * as multer from 'multer';

@Controller('splash-banner')
export class SplashBannerController {
  constructor(private readonly splashBannerService: SplashBannerService) {}

  @Post('upload')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() })) // Multer handles file uploads
  async create(@UploadedFile() file: { buffer: Buffer; mimetype: string }) {
    return this.splashBannerService.createBanner(file);
  }
  @Get()
  findAll() {
    return this.splashBannerService.getBanners();
  }
  @Get(':id')
  findOne(@Param() id: string) {
    return this.splashBannerService.getBanner(id);
  }
  @Patch('update/:id')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: { buffer: Buffer; mimetype: string },
  ) {
    return this.splashBannerService.updateBanner(id, file);
  }
  @Delete(':id')
  remove(@Param() id: string) {
    return this.splashBannerService.deleteBanner(id);
  }
}
