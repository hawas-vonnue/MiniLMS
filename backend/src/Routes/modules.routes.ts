import { Router } from "express";
import * as controller from "../Controllers/Modules.controller";
import { Authorize, isAdmin } from "../middleWare/auth";
import { validateRequest } from "../middleWare/validation";
import { addLessonSchema, addQuizSchema } from "../types/schema";

export const moduleRoute = Router();

moduleRoute.post(
    "/:id/lessons",
    Authorize,
    isAdmin,
    validateRequest(addLessonSchema),
    controller.addLesson
);
moduleRoute.post(
    "/:id/quiz",
    Authorize,
    isAdmin,
    validateRequest(addQuizSchema),
    controller.createQuizWithQuestions
);
