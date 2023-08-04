import { HttpException, HttpStatus } from '@nestjs/common';

interface HttpStatusMessageMap {
  [key: string]: string;
}

const statusMessages: HttpStatusMessageMap = {
  ['user-valid']: 'Sorry, the user does not exist',
  ['credential']: 'The credential are incorrect, please try again',
};

export class UserException extends HttpException {
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
