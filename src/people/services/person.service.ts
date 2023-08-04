import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PersonEntity } from '../../entities';
import { Status } from '../../constants';

/**
 * Service to Person
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private _personRepository: Repository<PersonEntity>,
  ) {}

  async getPerson(dni: number) {
    const alias = PersonEntity.ALIAS;
    return await this._personRepository
      .createQueryBuilder(alias)
      .where(`${alias}.status =:status`, { status: Status.Active })
      .andWhere(`${alias}.dni =:dni`, { dni })
      .getOne();
  }

  async createPerson(person: PersonEntity): Promise<PersonEntity> {
    return await this._personRepository.save(person);
  }

  async updatePerson(
    personId: number,
    person: PersonEntity,
  ): Promise<UpdateResult> {
    return await this._personRepository.update(personId, person);
  }
}
