import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {

    constructor (message: string, status: HttpStatus) {
        super(message, status);
    }

}