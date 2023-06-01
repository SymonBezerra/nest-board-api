import { HttpException, HttpStatus } from "@nestjs/common";

export class TaskNotFoundException extends HttpException{
    constructor (message: string, status: HttpStatus) {
        super(message, status);
    }
}