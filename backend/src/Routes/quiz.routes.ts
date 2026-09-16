import { Router } from "express";
import * as controller from "../Controllers/quiz.controller";
import { Authorize, isStudent } from "../middleWare/auth";
import { validateRequest } from "../middleWare/validation";
import { submitAnswerSchema } from "../types/schema";

export const quizRoute = Router();

quizRoute.get("/:id", Authorize, isStudent, controller.getQuestions);
quizRoute.post(
    "/:id/submit",
    Authorize,
    isStudent,
    validateRequest(submitAnswerSchema),
    controller.submitAnswer
);
