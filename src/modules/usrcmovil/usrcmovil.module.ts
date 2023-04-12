import { Module } from '@nestjs/common';
import { UsrcmovilService } from './usrcmovil.service';
import { UsrcmovilController } from './usrcmovil.controller';

@Module({
  controllers: [UsrcmovilController],
  providers: [UsrcmovilService]
})
export class UsrcmovilModule {}
