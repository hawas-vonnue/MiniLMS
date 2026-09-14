import { Response, Request, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: AuthorizedUser;
        }
    }
}

export function Authorize(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) return next(new UnauthorizedError());

    const token = authorization.split("Bearer ")[1];

    const JWT_SECRET = process.env.JWT_SECRET || "secret";

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthorizedUser;
        req.user = decoded;

        next();
    } catch (error) {
        return next(new UnauthorizedError());
    }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next(new ForbiddenError());

    if (req.user.role !== "admin") next(new ForbiddenError());

    next();
}

export function isStudent(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next(new ForbiddenError());

    if (req.user.role !== "student") next(new ForbiddenError());

    next();
}
