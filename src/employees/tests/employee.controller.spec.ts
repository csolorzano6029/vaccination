import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from '../controllers/employee.controller';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDto } from '../dtos/employee.dto';
import {
  CreateEmployeeDto,
  FilterEmployeeDto,
  ResponseCreateEmployeeDto,
} from '../dtos';

describe('EmployeeController', () => {
  let employeeController: EmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
  });

  const mockEmployeeService = {
    listEmployees: jest.fn().mockImplementation(() => {
      return [
        {
          id: 1,
          dni: '1312706028',
          firstName: 'Fernando',
          lastName: 'Alcivar',
          birthDate: '1995-05-29',
          homeAddress: 'Calle 123, Ciudad, País',
          mobilePhone: '+12345678901',
          status: 'Active',
          username: 'falcivar@ec.krugercorp.com',
          vaccinationStatus: true,
          vaccines: null,
          roles: [
            {
              id: 2,
              name: 'Employee',
            },
          ],
        },
        {
          id: 4,
          dni: '1312706029',
          firstName: 'Carlos Arturo',
          lastName: 'Solorzano Alcivar',
          birthDate: '2023-01-01',
          homeAddress: 'Calle 123, Ciudad, País',
          mobilePhone: '+12345678901',
          status: 'Active',
          username: 'csolorzano6029@gmail.com',
          vaccinationStatus: false,
          vaccines: null,
          roles: [
            {
              id: 1,
              name: 'Administrator',
            },
          ],
        },
      ];
    }),
    myInformation: jest.fn().mockImplementation(() => {
      return {
        id: 1,
        dni: 1312706028,
        firstName: 'Fernando',
        lastName: 'Alcivar',
        birthDate: new Date('1995-05-29'),
        homeAddress: 'Calle 123, Ciudad, País',
        mobilePhone: '+12345678901',
        status: 'Active',
        username: 'falcivar@ec.krugercorp.com',
        vaccinationStatus: true,
        vaccines: null,
        roles: [
          {
            id: 2,
            name: 'Employee',
          },
        ],
      };
    }),
    createEmploye: jest.fn(),
  };

  it('should be defined', () => {
    expect(employeeController).toBeDefined();
  });

  describe('getEmployees', () => {
    it('should return an array of employees', async () => {
      const result = [
        {
          id: 1,
          dni: '1312706028',
          firstName: 'Fernando',
          lastName: 'Alcivar',
          birthDate: '1995-05-29',
          homeAddress: 'Calle 123, Ciudad, País',
          mobilePhone: '+12345678901',
          status: 'Active',
          username: 'falcivar@ec.krugercorp.com',
          vaccinationStatus: true,
          vaccines: null,
          roles: [
            {
              id: 2,
              name: 'Employee',
            },
          ],
        },
        {
          id: 4,
          dni: '1312706029',
          firstName: 'Carlos Arturo',
          lastName: 'Solorzano Alcivar',
          birthDate: '2023-01-01',
          homeAddress: 'Calle 123, Ciudad, País',
          mobilePhone: '+12345678901',
          status: 'Active',
          username: 'csolorzano6029@gmail.com',
          vaccinationStatus: false,
          vaccines: null,
          roles: [
            {
              id: 1,
              name: 'Administrator',
            },
          ],
        },
      ];
      expect(await employeeController.getEmployees()).toEqual(result);
    });
  });

  describe('myInformation', () => {
    it('should return employee information by dni', async () => {
      const dni = 1312706028;
      const expectedResult: EmployeeDto = {
        id: 1,
        dni,
        firstName: 'Fernando',
        lastName: 'Alcivar',
        birthDate: new Date('1995-05-29'),
        homeAddress: 'Calle 123, Ciudad, País',
        mobilePhone: '+12345678901',
        status: 'Active',
        username: 'falcivar@ec.krugercorp.com',
        vaccinationStatus: true,
        vaccines: null,
        roles: [
          {
            id: 2,
            name: 'Employee',
          },
        ],
      };

      mockEmployeeService.myInformation.mockResolvedValue(expectedResult);
      expect(await employeeController.myInformation(dni)).toEqual(
        expectedResult,
      );
    });
  });

  describe('CreateEmploye', () => {
    it('should create a new employee', async () => {
      const createEmployeeDto: CreateEmployeeDto = {
        dni: 1761420882,
        firstName: 'Kimberly',
        lastName: 'Marmignon',
        email: 'kimberlyMarmignon@gmail.com',
        birthDate: new Date('1997-10-20'),
        homeAddress: 'El Inca',
        mobilePhone: '0999077409',
        vaccinationStatus: true,
        role: 'Employee',
      };

      const expectedResult: ResponseCreateEmployeeDto = {
        id: 1,
        dni: 1761420882,
        firstName: 'Kimberly',
        lastName: 'Marmignon',
        username: 'kimberlyMarmignon@gmail.com',
        password: '1761420882',
        birthDate: new Date('1997-10-20'),
        homeAddress: 'El Inca',
        mobilePhone: '0999077409',
        status: 'Active',
        role: 'Employee',
      };

      mockEmployeeService.createEmploye.mockResolvedValue(expectedResult);
      expect(await employeeController.CreateEmploye(createEmployeeDto)).toEqual(
        expectedResult,
      );
    });
  });

  /* describe('filterEmployees', () => {
    it('should filter employees', async () => {
      const filterEmployeeDto: FilterEmployeeDto = {
        dni: '1761420882',
        email: 'kimberlyMarmignon@gmail.com',
        completeName: 'Kimberly',
        vaccine: 'AstraZeneca',
        startDate: '2022-01-01',
        finishDate: '2023-04-24',
        isVaccinated: true,
      };

      const expectedResult = [
        {
          id: 17,
          dni: '1761420882',
          firstName: 'Kimberly',
          lastName: 'Marmignon',
          birthDate: '1997-10-20',
          homeAddress: 'El Inca',
          mobilePhone: '0999077409',
          status: 'Active',
          username: 'kimberlyMarmignon@gmail.com',
          vaccinationStatus: true,
          vaccines: null,
          roles: [
            {
              id: 2,
              name: 'Employee',
            },
          ],
        },
      ];

      mockEmployeeService.listEmployees.mockResolvedValue(expectedResult);
      expect(
        await employeeController.filterEmployees(filterEmployeeDto),
      ).toEqual(expectedResult);
    });
  }); */
});
