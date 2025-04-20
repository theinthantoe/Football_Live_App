import {
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class IOSDto {
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

export class AndroidDto {
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
  @IsObject()
  @ValidateNested()
  @Type(() => IOSDto)
  ios?: IOSDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AndroidDto)
  android?: AndroidDto;
}
