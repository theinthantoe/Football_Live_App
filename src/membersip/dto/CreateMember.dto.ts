import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class SocialMedia {
  @IsOptional()
  @IsString()
  icon?: string;

  @IsString()
  link: string;
}

// Custom transform to parse from JSON string (e.g., from multipart/form-data)
function ParseJsonToClass(cls: any) {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Object.assign(new cls(), parsed);
      } catch (err) {
        return value; // Let validator throw error if invalid
      }
    }
    return value;
  });
}

export class CreateMemberDto {
  @IsString()
  title: string;

  @IsString()
  slogan: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMedia)
  @ParseJsonToClass(SocialMedia)
  telegram?: SocialMedia;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMedia)
  @ParseJsonToClass(SocialMedia)
  viber?: SocialMedia;


}
