import { Request, Response, NextFunction } from "express";
import * as service from "../Services/courses.service";
import { UnauthorizedError } from "../errors";

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

export async function getCourseDetails(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const courseId = Number(req.params.id);

        const result = await service.getCourseDetails(courseId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function enroll(req: Request, res: Response, next: NextFunction) {
    try {
        const courseId = Number(req.params.id);

        if (!req.user) throw new UnauthorizedError();

        const studentEmail = req.user.email;

        const result = await service.enroll(studentEmail, courseId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function listCourses(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const maxPageSize = 100;

        const {
            pageSize,
            pageNumber,
            createdBy,
            publishStatus,
            level,
            search,
        } = req.query;

        const whereClause: CourseWhereClause = {};

        let pageSizeOrg;
        if (pageSize) pageSizeOrg = Number(pageSize);
        else pageSizeOrg = 10;

        if (pageSizeOrg > maxPageSize) pageSizeOrg = maxPageSize;

        let pageNumberOrg;
        if (pageNumber) pageNumberOrg = Number(pageNumber);
        else pageNumberOrg = 1;

        if (createdBy) whereClause.createdBy = Number(createdBy);

        if (publishStatus) whereClause.publishStatus = Boolean(publishStatus);

        if (level)
            whereClause.level = String(level) as
                | "Beginner"
                | "Intermediate"
                | "Advanced";

        if (search)
            whereClause.OR = [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                    description: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ];

        const result = await service.listCourses(
            whereClause,
            pageNumberOrg,
            pageSizeOrg
        );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
