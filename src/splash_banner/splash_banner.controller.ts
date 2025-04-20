import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Delete,
  Patch,
  UploadedFiles,
  HttpException,
  HttpStatus, Query,
} from '@nestjs/common';
import { SplashBannerService } from './splash_banner.service';
import {
  BannerType,
  CreateSplashBannerDto,
} from './dto/create-splash_banner.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('splash-banners')
export class SplashBannerController {
  constructor(private readonly splashBannerService: SplashBannerService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images')) // handle multiple or single depending on type
  async createBanner(
    @Body() createSplashBannerDto: CreateSplashBannerDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const { type } = createSplashBannerDto;

    if (type === BannerType.TEXT && files?.length) {
      throw new HttpException(
        'Image upload is not allowed for text_banner type',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      [BannerType.SPLASH, BannerType.PLAYER].includes(type) &&
      files?.length
    ) {
      // Only take one image
      const file = files[0];
      createSplashBannerDto.image = [
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      ];
    }

    if (type === BannerType.HOME && files?.length) {
      // Accept multiple images
      createSplashBannerDto.image = files.map(
        (file) =>
          `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      );
    }

    // text_banner skips image

    return this.splashBannerService.createBanner(createSplashBannerDto);
  }

  @Get('list')
  getBanners(@Query('type') type?: string) {
    return this.splashBannerService.getBanners(type);
  }

  // @Get(':id')
  // getBanner(@Param('id') id: string) {
  //   return this.splashBannerService.getBanner(id);
  // }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateBanner(
    @Param('id') id: string,
    @Body() createSplashBannerDto: CreateSplashBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const typesRequiringImage = [
      'splash_banner',
      'home_banner',
      'player_banner',
    ];

    if (typesRequiringImage.includes(createSplashBannerDto.type) && file) {
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      createSplashBannerDto.image = [base64Image];
    }

    return this.splashBannerService.updateBanner(id, createSplashBannerDto);
  }

  @Delete('delete/:id')
  deleteBanner(@Param('id') id: string) {
    return this.splashBannerService.deleteBanner(id);
  }
}
