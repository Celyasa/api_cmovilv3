import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Usrcmovil } from '../usrcmovil/entities/usrcmovil.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { SigInDto } from './dto/sigin.dto';
import { IJwtPayload } from './jwt-payload.interface';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usrcmovil)
    private readonly _authService: Repository<Usrcmovil>,
    private readonly _jwtService: JwtService,
  ) {}

  async login(siginDto: SigInDto): Promise<{ token: string }> {
    const { ucmId } = siginDto;
    // const usrcmovil: Usrcmovil = await this._authService.findOne({
    //   where: { ucmId: ucmId },
    // });
    const usrcmovil: Usrcmovil = await this._authService
      .createQueryBuilder('usrcmovil')
      .where('usrcmovil.ucmId =:ucmId ', {
        ucmId: ucmId,
      })
      .getOne();
    if (!usrcmovil) {
      throw new NotFoundException('El usuario no existe');
    }
    if (usrcmovil.ucmInactivo == 1) {
      throw new NotFoundException('El usuario ha sido dado de baja');
    }

    if (ucmId != usrcmovil.ucmId) {
      throw new UnauthorizedException('Datos Incorrectos');
    }
    return this.generarJWT(usrcmovil);
  }

  async generarJWT(usrcmovil: IJwtPayload) {
    const payload: IJwtPayload = {
      ucmCliente: usrcmovil.ucmCliente,
      ucmCodigo: usrcmovil.ucmCodigo,
      ucmConfigura: usrcmovil.ucmConfigura,
      ucmEmpresa: usrcmovil.ucmEmpresa,
      ucmId: usrcmovil.ucmId,
      ucmNombre: usrcmovil.ucmNombre,
      ucmNuevaVersion: usrcmovil.ucmNuevaVersion,
      ucmServidor: usrcmovil.ucmServidor,
      ucmVersion: usrcmovil.ucmVersion,
      ucmInactivo: usrcmovil.ucmInactivo,
      ucmModulo: usrcmovil.ucmModulo,
    };

    console.log(payload);

    const token = await this._jwtService.sign(payload, {
      expiresIn: '30 days',
    });
    return { ok: true, token };
  }

  async decodeToken(headers): Promise<AuthDto> {
    let decoded = new AuthDto();
    try {
      decoded = await this._jwtService.verify(
        headers.authorization.split(' ')[1],
      );
    } catch (error) {
      return null;
    }
    return plainToInstance(AuthDto, decoded);
  }
}
