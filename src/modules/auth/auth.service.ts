import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Usrcmovil } from '../usrcmovil/entities/usrcmovil.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SigInDto } from './dto/sigin.dto';
import { IJwtPayload, IJwtPayloadWeb } from './jwt-payload.interface';
import { AuthDto } from './dto/auth.dto';
import { SigInWebDto } from './dto/sigin_web.dto';

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

    if (usrcmovil.ucmConfigura == 0) {
      throw new NotFoundException('Usuario con sesión activa');
    }
    if (ucmId != usrcmovil.ucmId) {
      throw new UnauthorizedException('Datos Incorrectos');
    }

    if (usrcmovil.ucmConfigura == 1) {
      // await this._authService
      //   .createQueryBuilder('usrcmovil')
      //   .update()
      //   .set({
      //     ucmConfigura: 0,
      //   })
      //   .where('usrcmovil.ucm_id =:ucmId', {
      //     ucmId: ucmId,
      //   })
      //   .execute();
      usrcmovil.ucmConfigura = 0;
    }
    return this.generarJWT(usrcmovil);
  }

  async loginWeb(sigInWebDto: SigInWebDto): Promise<{ token: string }> {
    const { usuUsuario, usuClave } = sigInWebDto;

    const usrcmovil = await this._authService.query(
      `
      SELECT  ucm_clave, ucm_codigo, ucm_age_codigo, ucm_nivel_usuario, alm_nombre, uag_almacen, UCM_NOMBRE
      FROM W_CMOVIL_USUARIOS U
      where ucm_ID='${usuUsuario}'
      and ucm_clave='${usuClave}'

      `,
    );
    if (usrcmovil.length == 0) {
      throw new NotFoundException('Usuario o contrasenia incorrecta');
    }
    const transformedResult = {
      UCM_CLAVE: usrcmovil[0].UCM_CLAVE,
      UCM_CODIGO: usrcmovil[0].UCM_CODIGO,
      UCM_AGE_CODIGO: usrcmovil[0].UCM_AGE_CODIGO,
      UCM_NIVEL_USUARIO: usrcmovil[0].UCM_NIVEL_USUARIO,
      UCM_NOMBRE: usrcmovil[0].UCM_NOMBRE,
      almacen: usrcmovil.map((item) => ({
        ALM_NOMBRE: item.ALM_NOMBRE,
        UAG_ALMACEN: item.UAG_ALMACEN,
      })),
    };

    return this.generarJWTWeb(transformedResult);
  }

  async generarJWTWeb(usrcmovil: IJwtPayloadWeb) {
    const payload: IJwtPayloadWeb = {
      almacen: usrcmovil.almacen,
      UCM_CLAVE: usrcmovil.UCM_CLAVE,
      UCM_AGE_CODIGO: usrcmovil.UCM_AGE_CODIGO,
      UCM_CODIGO: usrcmovil.UCM_CODIGO,
      UCM_NIVEL_USUARIO: usrcmovil.UCM_NIVEL_USUARIO,
      UCM_NOMBRE: usrcmovil.UCM_NOMBRE,
    };
    const token = await this._jwtService.sign(payload, {
      expiresIn: '30 days',
    });
    return { ok: true, token };
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
      ucmAgeCodigo: usrcmovil.ucmAgeCodigo,
      ucmAlmCodigo: usrcmovil.ucmAlmCodigo,
    };

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

  async refreshToken(ucmId: string): Promise<{ token: string }> {
    const usrcmovil: Usrcmovil = await this._authService
      .createQueryBuilder('usrcmovil')
      .where('usrcmovil.ucmId =:ucmId ', {
        ucmId: ucmId,
      })
      .getOne();
    if (!usrcmovil) {
      throw new BadRequestException();
    }
    return this.generarJWT(usrcmovil);
  }
}
