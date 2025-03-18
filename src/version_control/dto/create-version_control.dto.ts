import {
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class IOSDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  slogan: string;

  @IsNotEmpty()
  @IsString()
  version: string;

  @IsNotEmpty()
  @IsNumber()
  buildNumber: number;

  @IsNotEmpty()
  @IsString()
  appStoreLink: string;
}

class AndroidDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  slogan: string;

  @IsNotEmpty()
  @IsString()
  version: string;

  @IsNotEmpty()
  @IsNumber()
  buildNumber: number;

  @IsNotEmpty()
  @IsString()
  playStoreLink: string;
}

export class CreateVersionControlDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => IOSDto)
  ios?: IOSDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AndroidDto)
  android?: AndroidDto;
}
