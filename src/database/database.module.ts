import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'oracle' as const,
        host: config.get<string>('HOST_DB'),
        port: config.get<number>('PORTDB'),
        username: config.get<string>('USERNAMEDB'),
        password: config.get<string>('PASSWORDDB'),
        database: config.get<string>('DBNAME'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: false,
        logging: true,
        connectString:
          '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.10.10)(PORT = 1521))(CONNECT_DATA =(SERVER = DEDICATED)(SID = CRISTAL)))',
      }),
    }),
  ],
})
export class DatabaseModule {}
