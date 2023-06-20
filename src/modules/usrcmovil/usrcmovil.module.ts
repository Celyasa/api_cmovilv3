import { Module } from '@nestjs/common';
import { UsrcmovilService } from './usrcmovil.service';
import { UsrcmovilController } from './usrcmovil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usrcmovil } from './entities/usrcmovil.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usrcmovil]), AuthModule],
  controllers: [UsrcmovilController],
  providers: [UsrcmovilService],
  exports: [UsrcmovilService],
})
export class UsrcmovilModule {}
