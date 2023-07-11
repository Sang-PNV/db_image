import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // đăng ký
  @HttpCode(201)
  @Post('sign-up')
  signUp(@Body() body) {
    return this.authService.signUp(body);
  }

  // đăng nhập
  @HttpCode(200)
  @Post('login')
  login(@Body() body) {
    return this.authService.login(body);
  }
}
