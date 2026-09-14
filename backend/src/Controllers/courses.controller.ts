import { Request, Response, NextFunction } from "express";
import * as service from "../Services/courses.service";

export async function createCourse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await service.createCourse(req.body);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export async function editCourse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const courseId = Number(req.params.id);

        const result = await service.editCourse(courseId, req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function publishCourse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const courseId = Number(req.params.id);

        const result = await service.publishCourse(courseId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteCourse(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const courseId = Number(req.params.id);

        const result = await service.deleteCourse(courseId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function addModule(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const courseId = Number(req.params.id);

        const result = await service.addModule(courseId, req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
