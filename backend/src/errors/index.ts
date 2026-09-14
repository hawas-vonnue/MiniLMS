import { AppError } from "./appError";

export class BadRequestError extends AppError {
    constructor(message: string = "Bad Request") {
        super(message, 400);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Conflict") {
        super(message, 409);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized Error") {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Permission denied") {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Not found") {
        super(message, 404);
    }
}
