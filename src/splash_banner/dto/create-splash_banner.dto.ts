import { IsEnum, IsOptional, IsString, IsArray } from 'class-validator';

export enum BannerType {
  SPLASH = 'splash_banner',
  HOME = 'home_banner',
  TEXT = 'text_banner',
  PLAYER = 'player_banner',
}

export class CreateSplashBannerDto {
  @IsEnum(BannerType)
  type: BannerType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image?: string[];

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  duration?: string;
}
