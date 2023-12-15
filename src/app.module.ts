import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';

import { UsrcmovilModule } from './modules/usrcmovil/usrcmovil.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ProductoModule } from './modules/producto/producto.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get<number>('PORT') || 3000;
  }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply((req, res, next) => {
  //       res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //       res.header('Access-Control-Allow-Credentials', 'true');
  //       res.header(
  //         'Access-Control-Allow-Headers',
  //         'Origin, X-Requested-With, Content-Type, Accept',
  //       );
  //       next();
  //     })
  //     .forRoutes('/');
  // }
}
