import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  BadRequestException,
  Header,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigInDto } from './dto/sigin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SigInWebDto } from './dto/sigin_web.dto';

@UsePipes(ValidationPipe)
@ApiTags('Login')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/usuario/login')
  async loginUsuario(@Body() siginDto: SigInDto) {
    return this.authService.login(siginDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/usuario/actualizar/token')
  async actualizarToken(@Headers() headers) {
    const token = await this.authService.decodeToken(headers);
    if (!token) {
      throw new BadRequestException();
    }
    return await this.authService.refreshToken(token.ucmId);
  }

  // @Header('Access-Control-Allow-Origin', '*')
  @Post('/usuario/login/web')
  async loginUserWeb(@Body() siginWebDto: SigInWebDto) {
    return this.authService.loginWeb(siginWebDto);
  }
}
