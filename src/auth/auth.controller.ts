import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/auth/dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('user/sign-in')
  @HttpCode(HttpStatus.OK)
  singIn(@Body() body: { phoneNumber: string; password: string }) {
    return this.authService.signIn(body.phoneNumber, body.password);
  }
  @Post('admin/sign-in')
  @HttpCode(HttpStatus.OK)
  singInAdmin(@Body() signInDto: SignInDto) {
    return this.authService.signInAdmin(signInDto.email, signInDto.password);
  }
}
