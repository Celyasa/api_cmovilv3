import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsrcmovilService } from './usrcmovil.service';
import { CreateUsrcmovilDto } from './dto/create-usrcmovil.dto';
import { UpdateUsrcmovilDto } from './dto/update-usrcmovil.dto';

@Controller('usrcmovil')
export class UsrcmovilController {
  constructor(private readonly usrcmovilService: UsrcmovilService) {}
}
