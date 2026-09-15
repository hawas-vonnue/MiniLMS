import { Router } from "express";
import * as controller from "../Controllers/quiz.controller";
import { Authorize, isStudent } from "../middleWare/auth";

export const quizRoute = Router();

quizRoute.get("/:id", Authorize, isStudent, controller.getQuestions);
quizRoute.post("/:id/submit", Authorize, isStudent, controller.submitAnswer);
