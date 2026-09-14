import { Router } from "express";
import * as controller from "../Controllers/Modules.controller";
import { Authorize, isAdmin } from "../middleWare/auth";

export const moduleRoute = Router();

moduleRoute.post("/:id/lessons", Authorize, isAdmin, controller.addLesson);
moduleRoute.post(
    "/:id/quiz",
    Authorize,
    isAdmin,
    controller.createQuizWithQuestions
);
