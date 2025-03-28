import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import Messages from 'src/utils/message';
@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    const response = await this.UsersService.findByemail(email);
    const user = response.data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      return {
        status: HttpStatus.OK,
        access_token: this.jwtService.sign(payload),
        message: Messages.logIn,
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
