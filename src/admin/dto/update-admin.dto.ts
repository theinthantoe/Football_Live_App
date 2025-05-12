import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleType } from 'src/admin/dto/create-admin.dto';

export class UpdateAdminDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsEnum(RoleType)
  role: RoleType;
}
