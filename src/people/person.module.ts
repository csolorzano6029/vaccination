import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonService } from './services';
import { PersonEntity } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
