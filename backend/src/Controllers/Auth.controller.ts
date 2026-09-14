import { NextFunction, Request, Response } from "express";
import * as service from "../Services/auth.service";
import { NotFoundError, UnauthorizedError } from "../errors";

export async function registerStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await service.createStudent(req.body);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await service.login(req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = await service.refresh(req.body.refreshToken);

        res.status(200).json(accessToken);
    } catch (error) {
        console.log(error);

        next(new UnauthorizedError("Token is invalid or expired"));
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        const tokenEntry = await service.logout(req.body.refreshToken);

        res.status(200).json({
            status: "Success",
            message: "Successfully logged out",
        });
    } catch (error) {
        console.log(error);

        next(new NotFoundError());
    }
}
