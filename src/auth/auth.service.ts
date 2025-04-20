import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import Messages from 'src/utils/message';
import { AdminService } from 'src/admin/admin.service';
@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private AdminService: AdminService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    const response = await this.UsersService.findByemail(email);
    const user = response.data;
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
  async signInAdmin(email: string, password: string) {
    const response = await this.AdminService.findByemail(email);
    const user = response.data;
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        status: HttpStatus.OK,
        access_token: this.jwtService.sign(payload),
        message: Messages.logIn,
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
