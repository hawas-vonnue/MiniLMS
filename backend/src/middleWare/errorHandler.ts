import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    console.log("Unexpected error", err);

    return res.status(500).json({
        status: "error",
        message: "Internal server Error",
    });
}
