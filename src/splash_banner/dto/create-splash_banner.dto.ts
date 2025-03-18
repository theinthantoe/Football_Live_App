import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSplashBannerDto {
  @IsNotEmpty()
  @IsString()
  image: string;
}
