import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();
  // đăng ký
  async signUp(body) {
    let { full_name, email, password } = body;
    try {
      let checkEmail = await this.prisma.users.findFirst({ where: { email } });
      // console.log('checkEmail: ', checkEmail);
      if (checkEmail) {
        throw new HttpException( {mess :"Email đã tồn tại"},400)
      } else {
        let newUser = {
          full_name,
          email,
          password: bcrypt.hashSync(password, 10),
        };
        await this.prisma.users.create({ data: newUser });
        return 'Tạo tài khoản thành công';
      }
    } catch (error) {
      console.log(error);
      
      throw new HttpException(error.response.mess, error.status);
    }
  }
  // đăng nhập
  async login(body) {
    try {
      let { email, password } = body;
      let checkEmail = await this.prisma.users.findFirst({ where: { email } });
      if (checkEmail) {
        if (bcrypt.compareSync(password, checkEmail.password)) {
          let token = await this.jwtService.signAsync(
            { data: checkEmail },
            { secret: this.configService.get('KEY'), expiresIn: '1d' },
          );
          return {token}
        } else {
          throw new HttpException( {mess :"Mật khẩu không đúng"},400);
        }
      } else {
        throw new HttpException( {mess :"Email không tồn tại"},404)
      }
    } catch (error) {
      throw new HttpException(error.response.mess, error.status);
    }
  }
}
