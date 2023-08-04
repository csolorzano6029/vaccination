import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VaccineService } from './services';
import { VaccineEntity } from '../entities';
import { VaccineController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineEntity])],
  providers: [VaccineService],
  exports: [VaccineService],
  controllers: [VaccineController],
})
export class VaccineModule {}
