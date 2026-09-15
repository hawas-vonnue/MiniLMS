import * as controller from "../Controllers/lessons.controller";
import { Router } from "express";
import { Authorize, isStudent } from "../middleWare/auth";

export const lessonRoute = Router();

lessonRoute.post(
    "/:id/complete",
    Authorize,
    isStudent,
    controller.markComplete
);
