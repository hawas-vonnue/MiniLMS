import { Request, Response, NextFunction } from "express";
import * as service from "../Services/modules.service";

export async function addLesson(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const moduleId = Number(req.params.id);
        const result = await service.addLesson(moduleId, req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function createQuizWithQuestions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const moduleId = Number(req.params.id);
        const result = await service.createQuizWithQuestions(
            moduleId,
            req.body.quiz,
            req.body.questions
        );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
