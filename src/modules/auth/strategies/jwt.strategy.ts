import { UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Usrcmovil } from 'src/modules/usrcmovil/entities/usrcmovil.entity';
import { Repository } from 'typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { IJwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(Usrcmovil)
    private readonly _authService: Repository<Usrcmovil>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: IJwtPayload) {
    const { ucmId } = payload;
    const user: Usrcmovil = await this._authService
      .createQueryBuilder('usrcmovil')
      .where('usrcmovil.ucmId =:ucmId', {
        ucmId: ucmId,
      })
      .getOne();
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
