import { PartialType } from '@nestjs/mapped-types';
import { CreateSplashBannerDto } from './create-splash_banner.dto';

export class UpdateSplashBannerDto extends PartialType(CreateSplashBannerDto) {}
