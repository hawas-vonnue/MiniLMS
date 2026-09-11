import { NextFunction, Request, Response } from "express";
import * as service from "../Services/auth.service";

export async function registerStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await service.createStudent(req.body);

        res.status(201).json(result);
    } catch (error) {
        console.log(error);

        next(error);
    }
}
