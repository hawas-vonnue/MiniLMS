import { Router } from "express";
import * as controller from "../Controllers/Modules.controller";
import { Authorize, isAdmin } from "../middleWare/auth";

export const moduleRouter = Router();

moduleRouter.post("/:id/lessons", Authorize, isAdmin, controller.addLesson);
moduleRouter.post(
    "/:id/quiz",
    Authorize,
    isAdmin,
    controller.createQuizWithQuestions
);
