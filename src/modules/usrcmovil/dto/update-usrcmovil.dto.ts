import { PartialType } from '@nestjs/swagger';
import { CreateUsrcmovilDto } from './create-usrcmovil.dto';

export class UpdateUsrcmovilDto extends PartialType(CreateUsrcmovilDto) {}
