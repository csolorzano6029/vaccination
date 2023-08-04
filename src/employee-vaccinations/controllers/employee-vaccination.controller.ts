import { Body, Controller, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeVaccinationService } from '../services';
import {
  CreateEmployeeVaccinationDto,
  EmployeeVaccinationDto,
  UpdateEmployeeVaccinationDto,
} from '../dtos';

@ApiTags('Employee Vaccinations')
@Controller('/employeeVaccinations')
export class EmployeeVaccinationController {
  constructor(
    private readonly _employeeVaccinationService: EmployeeVaccinationService,
  ) {}

  @ApiOperation({ summary: 'Create a new employee vaccination' })
  @ApiBody({ type: CreateEmployeeVaccinationDto })
  @ApiResponse({
    status: 201,
    description: 'The employee vaccination has been created',
    type: EmployeeVaccinationDto,
  })
  @Post('/create')
  async createEmployeeVaccination(
    @Body() employeeVaccination: CreateEmployeeVaccinationDto,
  ): Promise<EmployeeVaccinationDto> {
    return await this._employeeVaccinationService.createEmployeeVaccination(
      employeeVaccination,
    );
  }

  @ApiOperation({ summary: 'Update employee vaccination information' })
  @ApiQuery({
    name: 'employeeVaccinationId',
    description: 'Employee vaccination ID',
    type: Number,
  })
  @ApiBody({
    description: 'Employee vaccination data to update',
    type: CreateEmployeeVaccinationDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Employee vaccination updated successfully',
    type: EmployeeVaccinationDto,
  })
  @Post('/update')
  async updateEmployeeVaccination(
    @Query('employeeVaccinationId') employeeVaccinationId: number,
    @Body() employeeVaccination: UpdateEmployeeVaccinationDto,
  ) {
    return await this._employeeVaccinationService.updateEmployeeVaccination(
      employeeVaccinationId,
      employeeVaccination,
    );
  }
}
