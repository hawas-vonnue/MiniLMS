import * as service from "../Services/admin.service";
import { Request, Response, NextFunction } from "express";

export async function listAllStudents(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await service.listAllStudents();

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function getEnrollmentList(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const courseId = Number(req.params.id);

        const result = await service.getEnrollmentList(courseId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function getAllSubmissions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { quizId, studentId } = req.query;

        const whereClause: WhereClause = {};
        if (quizId) whereClause.quizId = Number(quizId);
        if (studentId) whereClause.studentId = Number(studentId);

        const result = await service.getAllSubmissions(whereClause);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
