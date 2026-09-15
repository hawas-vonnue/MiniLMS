import { NextFunction, Request, Response } from "express";
import * as service from "../Services/lessons.service";
import { UnauthorizedError } from "../errors";

export async function markComplete(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new UnauthorizedError();

        const lessonId = Number(req.params.id);
        const studentEmail = req.user.email;

        const result = await service.markComplete(studentEmail, lessonId);

        res.status(200).json({
            status: "Success",
            message: "marked complete",
            result,
        });
    } catch (error) {
        next(error);
    }
}
