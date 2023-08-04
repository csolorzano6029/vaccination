import { CreateEmployeeVaccinationDto } from './create-employee-vaccination.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEmployeeVaccinationDto extends PartialType(
  CreateEmployeeVaccinationDto,
) {}
