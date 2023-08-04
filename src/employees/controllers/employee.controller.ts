import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeService } from '../services/employee.service';
import {
  CreateEmployeeDto,
  DeleteEmployeeDto,
  FilterEmployeeDto,
  ResponseCreateEmployeeDto,
  ResponseUpdateEmployeeDto,
  UpdateEmployeeDto,
} from '../dtos';
import { Type } from '../../constants/app.constant';
import { EmployeeDto } from '../dtos/employee.dto';

@ApiTags('Employees')
@Controller('/employees')
export class EmployeeController {
  constructor(private readonly _employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'List all employees' })
  @ApiOkResponse({
    type: [EmployeeDto],
    description: 'Array of Employee objects',
  })
  @Get()
  async getEmployees(): Promise<EmployeeDto[]> {
    return await this._employeeService.listEmployees();
  }

  @ApiOperation({ summary: 'Get employee information by dni' })
  @ApiOkResponse({ type: EmployeeDto, description: 'Employee object' })
  @Get('/myInformation')
  async myInformation(@Query('dni') dni: number): Promise<EmployeeDto> {
    return await this._employeeService.myInformation(dni);
  }

  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({
    type: CreateEmployeeDto,
    description: 'Employee object to be created',
  })
  @ApiResponse({
    status: 201,
    type: ResponseCreateEmployeeDto,
    description: 'The created Employee object',
  })
  @Post('/create')
  async CreateEmploye(
    @Body() createEmployee: CreateEmployeeDto,
  ): Promise<ResponseCreateEmployeeDto> {
    return await this._employeeService.createEmploye(createEmployee);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Filter employees' })
  @ApiBody({
    type: FilterEmployeeDto,
    description: 'Filter criteria for employees',
  })
  @ApiResponse({
    status: 200,
    type: [EmployeeDto],
    description: 'Filter Employee object',
  })
  @Post('/filter')
  async filterEmployees(
    @Body() filterEmployee: FilterEmployeeDto,
  ): Promise<{ message: string; data: EmployeeDto[] }> {
    const employees = await this._employeeService.listEmployees(filterEmployee);
    const response = { message: 'Success', data: employees };
    return response;
  }

  @ApiOperation({ summary: 'Delete an employee' })
  @ApiOkResponse({
    type: DeleteEmployeeDto,
    description: 'Deleted employee object',
  })
  @Patch('/delete')
  async deleteEmployee(
    @Query('dni') dni: number,
    @Query('role') role: string,
  ): Promise<DeleteEmployeeDto> {
    return await this._employeeService.deleteEmployee(dni, role);
  }

  @ApiOperation({ summary: 'Update an employee' })
  @ApiOkResponse({
    type: ResponseUpdateEmployeeDto,
    description: 'Update an employee in the database',
  })
  @ApiQuery({
    name: 'dni',
    description: 'Employee Identification',
    type: Number,
  })
  @Patch('/update')
  async updateEmployee(
    @Query('dni') dni: number,
    @Query('role') role: string,
    @Body() updateEmployee: UpdateEmployeeDto,
  ): Promise<ResponseUpdateEmployeeDto> {
    return await this._employeeService.updateEmployee(
      dni,
      updateEmployee,
      role,
    );
  }
}
