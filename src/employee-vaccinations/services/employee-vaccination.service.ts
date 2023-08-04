import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { EmployeeVaccinationEntity } from '../../entities';
import { Status } from '../../constants/app.constant';
import { EmployeeService } from '../../employees/services';
import { VaccineService } from '../../vaccines/services';
import {
  CreateEmployeeVaccinationDto,
  EmployeeVaccinationDto,
  UpdateEmployeeVaccinationDto,
} from '../dtos';

/**
 * Service to Employee Vaccination
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class EmployeeVaccinationService {
  constructor(
    @InjectRepository(EmployeeVaccinationEntity)
    private _employeeVaccinationRepository: Repository<EmployeeVaccinationEntity>,
    private _employeeService: EmployeeService,
    private _vaccineService: VaccineService,
  ) {}

  async getEmployeeVaccination(
    employeeId: number,
    vaccineId: number,
  ): Promise<EmployeeVaccinationEntity> {
    const alias = EmployeeVaccinationEntity.ALIAS;

    return await this._employeeVaccinationRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.vaccine`, 'vaccine')
      .leftJoinAndSelect(`${alias}.employee`, 'employee')
      .where(`${alias}.status = :status`, { status: Status.Active })
      .andWhere('vaccine.id = :vaccineId', { vaccineId })
      .andWhere('employee.id = :vaccineId', { employeeId })
      .getOne();
  }

  async createEmployeeVaccination(
    createEmployeeVaccination: CreateEmployeeVaccinationDto,
  ): Promise<EmployeeVaccinationDto> {
    const { employeeId, vaccineId } = createEmployeeVaccination;
    const employee = await this._employeeService.getEmployee(
      null,
      null,
      employeeId,
      true,
    );
    const vaccine = await this._vaccineService.getVaccine(vaccineId);

    const employeeVaccination = new EmployeeVaccinationEntity();
    employeeVaccination.vaccine = vaccine;
    employeeVaccination.employee = employee;
    employeeVaccination.doseNumber = createEmployeeVaccination.doseNumber;
    employeeVaccination.vaccinationDate =
      createEmployeeVaccination.vaccinationDate;

    const savedEmployeeVaccination =
      await this._employeeVaccinationRepository.save(employeeVaccination);

    const employeeVaccinationResponse = new EmployeeVaccinationDto();
    employeeVaccinationResponse.id = savedEmployeeVaccination.id;
    employeeVaccinationResponse.employeeId = employee.id;
    employeeVaccinationResponse.personId = employee.person.id;
    employeeVaccinationResponse.vaccine = vaccine.vaccineType;
    employeeVaccinationResponse.doseNumber =
      savedEmployeeVaccination.doseNumber;
    employeeVaccinationResponse.vaccinationDate =
      savedEmployeeVaccination.vaccinationDate;
    employeeVaccinationResponse.completeName =
      employee.person.firstName + ' ' + employee.person.lastName;
    return employeeVaccinationResponse;
  }

  async updateEmployeeVaccination(
    employeeVaccinationId: number,
    updateEmployeeVaccination: UpdateEmployeeVaccinationDto,
  ) {
    const { vaccineId } = updateEmployeeVaccination;
    const vaccine = await this._vaccineService.getVaccine(vaccineId);

    const employeeVaccination = new EmployeeVaccinationEntity();
    employeeVaccination.vaccine = vaccine;
    employeeVaccination.doseNumber = updateEmployeeVaccination.doseNumber;
    employeeVaccination.vaccinationDate =
      updateEmployeeVaccination.vaccinationDate;

    await this._employeeVaccinationRepository.update(
      employeeVaccinationId,
      employeeVaccination,
    );

    return {
      message: 'The employee has been updated successfully',
      employeeVaccination: updateEmployeeVaccination,
    };
  }
}
