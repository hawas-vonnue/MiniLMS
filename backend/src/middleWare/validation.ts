import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { BadRequestError } from "../errors";

export function validateRequest(schema: ZodObject) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = await schema.safeParseAsync({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        if (!result.success)
            return next(new BadRequestError(result.error.issues[0]?.message));

        next();
    };
}
