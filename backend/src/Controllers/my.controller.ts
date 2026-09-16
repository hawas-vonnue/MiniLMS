import { NextFunction, Request, Response } from "express";
import * as service from "../Services/my.service";
import { UnauthorizedError } from "../errors";

export async function getMyCourses(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new UnauthorizedError();

        const studentEmail = req.user.email;

        const result = await service.getMyCourses(studentEmail);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function getMyQuizHistory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new UnauthorizedError();

        const studentEmail = req.user.email;

        const result = await service.getMyQuizHistory(studentEmail);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
