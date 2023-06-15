import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';

import { UsrcmovilModule } from './modules/usrcmovil/usrcmovil.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ProductoModule } from './modules/producto/producto.module';
import { DescargarInformacionModule } from './modules/descargar_informacion/descargar_informacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        HOST_DB: Joi.string().required(),
        DBNAME: Joi.string().required(),
        USERNAMEDB: Joi.string().required(),
        PASSWORDDB: Joi.string().required(),
        PORTDB: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ConfigModule,
    AuthModule,
    UsrcmovilModule,
    ClienteModule,
    ProductoModule,
    DescargarInformacionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get<number>('PORT') || 3000;
  }
}
