import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { VaccineEntity } from '../../entities';
import { Status } from '../../constants/app.constant';
import { VaccineDto } from '../dtos/vaccine.dto';

/**
 * Service to Vaccine
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class VaccineService {
  private _logger = new Logger(VaccineService.name);
  constructor(
    @InjectRepository(VaccineEntity)
    private _vaccineRepository: Repository<VaccineEntity>,
  ) {}

  async getVaccines(): Promise<VaccineDto[]> {
    this._logger.log(Status.Active);
    const alias = VaccineEntity.ALIAS;
    return await this._vaccineRepository
      .createQueryBuilder(alias)
      .where(`${alias}.status = :status`, { status: Status.Active })
      .orderBy(`${alias}.vaccineType`, 'ASC')
      .getMany();
  }

  async getVaccine(vaccineId: number): Promise<VaccineEntity> {
    this._logger.log(Status.Active);
    const alias = VaccineEntity.ALIAS;
    return await this._vaccineRepository
      .createQueryBuilder(alias)
      .where(`${alias}.status = :status`, { status: Status.Active })
      .andWhere(`${alias}.id = :vaccineId`, { vaccineId })
      .getOne();
  }
}
