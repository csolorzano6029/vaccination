import { HttpException, HttpStatus } from '@nestjs/common';

interface HttpStatusMessageMap {
  [key: string]: string;
}

const statusMessages: HttpStatusMessageMap = {
  ['invalid-dni']: 'The DNI you are trying to register is not valid',
  ['email-exist']: 'The email you are trying to register already exists',
  ['dni-exist']: 'The DNI you are trying to register already exists',
  ['employee-not-found']: 'The employee you want to delete was not found',
  ['not-access']: 'Sorry but you do not have permission to perform this action',
  ['inactive-employee']: `I can't create the employee, because it already exists, but it has inactive status, if you want to continue please activate the employee`,
};

export class EmployeeException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    const newMessage = statusMessages[message];
    super(
      {
        statusCode,
        newMessage,
        data: null,
      },
      statusCode,
    );
  }
}
