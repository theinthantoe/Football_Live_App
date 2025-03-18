import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SocialMedia {
  @IsString()
  icon: string;

  @IsString()
  link: string;
}

export class CreateMemberDto {
  @IsString()
  title: string;

  @IsString()
  slogan: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMedia)
  telegram?: SocialMedia;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMedia)
  viber?: SocialMedia;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMedia)
  messenger?: SocialMedia;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMedia)
  facebook?: SocialMedia;
}
