import { HttpException, HttpStatus } from "@nestjs/common";

export class ExistingUserException extends HttpException {

    constructor (message: string, status: HttpStatus) {
        super(message, status);
    }

}