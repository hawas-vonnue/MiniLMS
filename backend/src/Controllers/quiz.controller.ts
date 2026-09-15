import { NextFunction, Request, Response } from "express";
import * as service from "../Services/quiz.service";
import { UnauthorizedError } from "../errors";

export async function getQuestions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const quizId = Number(req.params.id);

        const result = await service.getQuestions(quizId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function submitAnswer(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new UnauthorizedError();

        const quizId = Number(req.params.id);
        const submittedAnswer = req.body.answers;
        const studentEmail = req.user.email;

        const result = await service.submitAnswer(
            studentEmail,
            quizId,
            submittedAnswer
        );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
