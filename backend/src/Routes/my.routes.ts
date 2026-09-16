import { Router } from "express";
import * as controller from "../Controllers/my.controller";
import { Authorize, isStudent } from "../middleWare/auth";

export const myRoute = Router();

myRoute.get("/courses", Authorize, isStudent, controller.getMyCourses);
myRoute.get("/submissions", Authorize, isStudent, controller.getMyQuizHistory);
