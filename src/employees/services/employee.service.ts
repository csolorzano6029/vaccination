import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import {
  EmployeeEntity,
  PersonEntity,
  UserEntity,
  UserRoleEntity,
} from '../../entities';
import { Status, Type, Role } from '../../constants/app.constant';
import {
  CreateEmployeeDto,
  DeleteEmployeeDto,
  FilterEmployeeDto,
  ResponseCreateEmployeeDto,
  ResponseUpdateEmployeeDto,
  UpdateEmployeeDto,
} from '../dtos';
import { PersonService } from '../../people/services';
import { UserService } from '../../users/services';
import { RoleService } from '../../roles/services';
import { UserRoleService } from '../../user-roles/services';
import { validateID } from '../../utils/validateiD';
import { EmployeeException } from '../../errors/employee.error';
import { EmployeeDto } from '../dtos/employee.dto';

/**
 * Service to Employee
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private _employeeRepository: Repository<EmployeeEntity>,
    private _userRoleService: UserRoleService,
    private _personService: PersonService,
    private _userService: UserService,
    private _roleService: RoleService,
  ) {}

  async filterEmployees(
    employees: SelectQueryBuilder<EmployeeEntity>,
    filters: FilterEmployeeDto,
  ): Promise<void> {
    const {
      dni,
      email,
      completeName,
      vaccine,
      isVaccinated,
      startDate,
      finishDate,
    } = filters;

    if (dni) {
      employees.andWhere('CAST(person.dni AS varchar) ILIKE :dni', {
        dni: `%${dni}%`,
      });
    }

    if (email) {
      employees.andWhere('employee.email ILIKE :email', {
        email: `%${email}%`,
      });
    }

    if (completeName) {
      employees.andWhere(
        "CONCAT(person.firstName, ' ', person.lastName) ILIKE :completeName",
        { completeName: `%${completeName}%` },
      );
    }

    if (vaccine) {
      employees.andWhere('vaccine.vaccineType ILIKE :vaccine', {
        vaccine: `%${vaccine}%`,
      });
    }

    if (isVaccinated) {
      employees.andWhere('employee.vaccinationStatus =:isVaccinated', {
        isVaccinated,
      });
    }

    if (startDate && finishDate) {
      employees.andWhere(
        'employeeVaccinations.vaccinationDate BETWEEN :startDate AND :finishDate',
        { startDate, finishDate },
      );
    }
  }

  async getEmployees(filters?: FilterEmployeeDto): Promise<EmployeeEntity[]> {
    const alias = EmployeeEntity.ALIAS;
    const employees = this._employeeRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.user`, 'user', 'user.status =:status', {
        status: Status.Active,
      })
      .leftJoinAndSelect(
        `${alias}.employeeVaccinations`,
        'employeeVaccinations',
        'employeeVaccinations.status =:status',
        {
          status: Status.Active,
        },
      )
      .leftJoinAndSelect(
        'employeeVaccinations.vaccine',
        'vaccine',
        'vaccine.status =:status',
        {
          status: Status.Active,
        },
      )
      .leftJoinAndSelect(
        `${alias}.person`,
        'person',
        'person.status =:status',
        {
          status: Status.Active,
        },
      )
      .leftJoinAndSelect(
        'user.userRoles',
        'userRoles',
        'userRoles.status =:status',
        {
          status: Status.Active,
        },
      )
      .leftJoinAndSelect('userRoles.role', 'role', 'role.status =:status', {
        status: Status.Active,
      })
      .where(`${alias}.status =:status`, { status: Status.Active });

    if (filters) await this.filterEmployees(employees, filters);

    return await employees.getMany();
  }

  async mapEmployees(employees: EmployeeEntity[]): Promise<EmployeeDto[]> {
    return employees.map((employee) => {
      const employeeDto = new EmployeeDto();

      employeeDto.id = employee.id;
      employeeDto.dni = employee.person.dni;
      employeeDto.firstName = employee.person?.firstName;
      employeeDto.lastName = employee.person?.lastName;
      employeeDto.birthDate = employee.birthDate;
      employeeDto.homeAddress = employee.homeAddress;
      employeeDto.mobilePhone = employee.mobilePhone;
      employeeDto.status =
        employee.status === Status.Active ? 'Active' : 'Inactive';
      employeeDto.username = employee.user?.username;
      employeeDto.vaccinationStatus = employee.vaccinationStatus;
      employeeDto.vaccines =
        employee.employeeVaccinations?.length > 0
          ? employee.employeeVaccinations?.map((employeeVaccination) => {
              return {
                id: employeeVaccination.vaccine?.id,
                name: employeeVaccination.vaccine?.vaccineType,
                doseNumber: employeeVaccination.doseNumber,
                vaccinationDate: employeeVaccination.vaccinationDate,
                employeeVaccinationId: employeeVaccination.id,
              };
            })
          : null;
      employeeDto.roles =
        employee.user?.userRoles?.length > 0
          ? employee.user?.userRoles.map((userRole) => {
              return { id: userRole.role?.id, name: userRole.role?.name };
            })
          : null;

      return employeeDto;
    });
  }

  async listEmployees(filters?: FilterEmployeeDto): Promise<EmployeeDto[]> {
    const employees = await this.getEmployees(filters);
    return await this.mapEmployees(employees);
  }

  async getEmployee(
    dni?: number,
    email?: string,
    employeeId?: number,
    isActive?: boolean,
  ): Promise<EmployeeEntity> {
    const alias = EmployeeEntity.ALIAS;
    const employee = this._employeeRepository.createQueryBuilder(alias);

    const addActiveStatus = isActive && isActive === true;

    if (addActiveStatus) {
      employee
        .leftJoinAndSelect(
          `${alias}.person`,
          'person',
          'person.status =:status',
          { status: Status.Active },
        )
        .leftJoinAndSelect(`${alias}.user`, 'user', 'user.status =:status', {
          status: Status.Active,
        })
        .leftJoinAndSelect(
          `${alias}.employeeVaccinations`,
          'employeeVaccinations',
          'employeeVaccinations.status =:status',
          {
            status: Status.Active,
          },
        )
        .leftJoinAndSelect(
          'employeeVaccinations.vaccine',
          'vaccine',
          'vaccine.status =:status',
          {
            status: Status.Active,
          },
        )
        .leftJoinAndSelect(
          'user.userRoles',
          'userRoles',
          'userRoles.status =:status',
          {
            status: Status.Active,
          },
        )
        .leftJoinAndSelect('userRoles.role', 'role', 'role.status =:status', {
          status: Status.Active,
        })
        .where(`${alias}.status =:status`, {
          status: Status.Active,
        });
    } else {
      employee
        .leftJoinAndSelect(`${alias}.person`, 'person')
        .leftJoinAndSelect(`${alias}.user`, 'user')
        .leftJoinAndSelect(
          `${alias}.employeeVaccinations`,
          'employeeVaccinations',
        )
        .leftJoinAndSelect('employeeVaccinations.vaccine', 'vaccine')
        .leftJoinAndSelect('user.userRoles', 'userRoles')
        .leftJoinAndSelect('userRoles.role', 'role');
    }

    if (dni) employee.andWhere('person.dni =:dni', { dni });
    if (email) employee.andWhere(`${alias}.email =:email`, { email });
    if (employeeId)
      employee.andWhere(`${alias}.id =:employeeId`, { employeeId });

    return await employee.getOne();
  }

  async myInformation(dni: number): Promise<EmployeeDto> {
    const employee = await this.getEmployee(dni, null, null, true);

    if (!employee)
      throw new EmployeeException('employee-not-found', HttpStatus.BAD_REQUEST);

    const employeeDto = new EmployeeDto();

    employeeDto.id = employee.id;
    employeeDto.dni = employee.person.dni;
    employeeDto.firstName = employee.person?.firstName;
    employeeDto.lastName = employee.person?.lastName;
    employeeDto.birthDate = employee.birthDate;
    employeeDto.homeAddress = employee.homeAddress;
    employeeDto.mobilePhone = employee.mobilePhone;
    employeeDto.status =
      employee.status === Status.Active ? 'Active' : 'Inactive';
    employeeDto.username = employee.user?.username;
    employeeDto.vaccinationStatus = employee.vaccinationStatus;
    employeeDto.vaccines =
      employee.employeeVaccinations?.length > 0
        ? employee.employeeVaccinations?.map((employeeVaccination) => {
            return {
              id: employeeVaccination.vaccine?.id,
              name: employeeVaccination.vaccine?.vaccineType,
              doseNumber: employeeVaccination.doseNumber,
              vaccinationDate: employeeVaccination.vaccinationDate,
              employeeVaccinationId: employeeVaccination.id,
            };
          })
        : null;
    employeeDto.roles =
      employee.user?.userRoles?.length > 0
        ? employee.user?.userRoles.map((userRole) => {
            return { id: userRole.role?.id, name: userRole.role?.name };
          })
        : null;

    return employeeDto;
  }

  async mapCreateEmployee(
    employee: EmployeeEntity,
    userrole: UserRoleEntity,
  ): Promise<ResponseCreateEmployeeDto> {
    const createEmployee = new ResponseCreateEmployeeDto();

    createEmployee.id = employee.id;
    createEmployee.dni = employee.person.dni;
    createEmployee.firstName = employee.person?.firstName;
    createEmployee.lastName = employee.person?.lastName;
    createEmployee.birthDate = employee.birthDate;
    createEmployee.homeAddress = employee.homeAddress;
    createEmployee.mobilePhone = employee.mobilePhone;
    createEmployee.status =
      employee.status === Status.Active ? 'Active' : 'Inactive';
    createEmployee.username = userrole.user?.username;
    createEmployee.password = userrole.user?.password;
    createEmployee.role = userrole.role?.name;

    return createEmployee;
  }

  async createEmploye(
    createEmployee: CreateEmployeeDto,
  ): Promise<ResponseCreateEmployeeDto> {
    const existPerson = await this._personService.getPerson(createEmployee.dni);
    const existEmailEmploye = await this.getEmployee(
      null,
      createEmployee.email,
      null,
      true,
    );
    const isValidDni = await validateID(String(createEmployee.dni));
    const role = await this._roleService.getRole(createEmployee.role);
    const currentDay = new Date();

    if (existPerson && !existEmailEmploye)
      throw new EmployeeException('inactive-employee', HttpStatus.BAD_REQUEST);

    if (existPerson)
      throw new EmployeeException('dni-exist', HttpStatus.BAD_REQUEST);

    if (existEmailEmploye)
      throw new EmployeeException('email-exist', HttpStatus.BAD_REQUEST);

    if (!isValidDni)
      throw new EmployeeException('invalid-dni', HttpStatus.BAD_REQUEST);

    const person = new PersonEntity();
    person.dni = createEmployee.dni;
    person.firstName = createEmployee.firstName;
    person.lastName = createEmployee.lastName;
    person.createdDate = currentDay;

    const savedPerson = await this._personService.createPerson(person);

    const employee = new EmployeeEntity();
    employee.email = createEmployee.email;
    employee.birthDate = createEmployee.birthDate;
    employee.homeAddress = createEmployee.homeAddress;
    employee.mobilePhone = createEmployee.mobilePhone;
    employee.vaccinationStatus = createEmployee.vaccinationStatus;
    employee.createdDate = currentDay;
    employee.person = savedPerson;

    const savedEmployee = await this._employeeRepository.save(employee);

    const user = new UserEntity();
    user.username = createEmployee.email;
    user.password = String(createEmployee.dni);
    user.createdDate = currentDay;
    user.employee = savedEmployee;

    const savedUser = await this._userService.createUser(user);

    const userRole = new UserRoleEntity();
    userRole.user = savedUser;
    userRole.role = role;
    userRole.createdDate = currentDay;

    const savedUserRole = await this._userRoleService.createUserRole(userRole);

    return await this.mapCreateEmployee(savedEmployee, savedUserRole);
  }

  async deleteEmployee(dni: number, role?: string): Promise<DeleteEmployeeDto> {
    const findEmployee = await this.getEmployee(dni, null, null, true);

    if (role !== Role.ADMINISTRATOR)
      throw new EmployeeException('not-access', HttpStatus.BAD_REQUEST);
    if (!findEmployee)
      throw new EmployeeException('employee-not-found', HttpStatus.BAD_REQUEST);

    if (dni && findEmployee) {
      const deleteEmployee = new DeleteEmployeeDto();
      await this._employeeRepository.update(findEmployee?.id, {
        status: Status.Inactive,
      });

      const user = new UserEntity();
      user.status = Status.Inactive;
      await this._userService.updateuser(findEmployee?.user?.id, user);

      deleteEmployee.message = 'The employee has been deleted successfully';
      deleteEmployee.id = findEmployee.id;
      (deleteEmployee.status = 'Inactive'),
        (deleteEmployee.employeeName =
          findEmployee.person.firstName + ' ' + findEmployee.person.lastName);
      deleteEmployee.dni = findEmployee.person.dni;
      deleteEmployee.email = findEmployee.email;

      return deleteEmployee;
    }
  }

  async updateEmployee(
    dni: number,
    updateEmployee: UpdateEmployeeDto,
    role?: string,
  ): Promise<ResponseUpdateEmployeeDto> {
    const findEmployee = await this.getEmployee(
      dni,
      null,
      null,
      !updateEmployee?.status ? true : false,
    );

    if (!findEmployee)
      throw new EmployeeException('employee-not-found', HttpStatus.BAD_REQUEST);

    if (dni && findEmployee) {
      const employee = new EmployeeEntity();
      employee.birthDate = updateEmployee.birthDate;
      employee.email = updateEmployee.email;
      employee.homeAddress = updateEmployee.homeAddress;
      employee.mobilePhone = updateEmployee.mobilePhone;
      employee.vaccinationStatus = updateEmployee.vaccinationStatus;

      const person = new PersonEntity();
      const isValidDni = validateID(String(updateEmployee?.dni));
      person.dni = updateEmployee.dni;
      person.firstName = updateEmployee.firstName;
      person.lastName = updateEmployee.lastName;

      const user = new UserEntity();

      if (updateEmployee?.status && role === Role.ADMINISTRATOR) {
        employee.status = updateEmployee.status;
        user.status = updateEmployee.status;
      }

      if (updateEmployee?.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
      }

      user.username = updateEmployee.email
        ? updateEmployee.email
        : updateEmployee.username;

      await this._employeeRepository.update(findEmployee.id, employee);
      await this._personService.updatePerson(findEmployee.person?.id, person);
      await this._userService.updateuser(findEmployee.user?.id, user);

      const responseUpdateEmployee = new ResponseUpdateEmployeeDto();
      responseUpdateEmployee.message =
        'The employee has been updated successfully';
      responseUpdateEmployee.employee = updateEmployee;

      return responseUpdateEmployee;
    }
  }
}
