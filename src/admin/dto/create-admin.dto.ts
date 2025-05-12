import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum RoleType {
  admin = 'admin',
  staff = 'staff',
}

export class CreateAdminDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsEnum(RoleType)
  role: RoleType;
}
export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  // @MinLength(8, { message: 'New password must be at least 8 characters long' })
  newPassword: string;

  @IsString()
  confirmPassword: string;
}
