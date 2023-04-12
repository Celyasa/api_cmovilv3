import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigInDto } from './dto/sigin.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@UsePipes(ValidationPipe)
@ApiTags('Login')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/usuario/login')
  async loginUsuario(@Body() siginDto: SigInDto) {
    return this.authService.login(siginDto);
  }
}
