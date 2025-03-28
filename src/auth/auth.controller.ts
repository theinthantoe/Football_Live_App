import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/auth/dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('user/sign-in')
  @HttpCode(HttpStatus.OK)
  singIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
