import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly useService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.useService.findOne(email);
    // 直接用原始密码和数据库存储的hashed密码进行比较
    const isPasswordMatching = await bcrypt.compare(
      password,
      user.password,
    );
    if (isPasswordMatching) {
      throw new UnauthorizedException();
    }
    const { password: pass, ...payload } = user || {};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
