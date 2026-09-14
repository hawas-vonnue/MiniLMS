import { Router } from "express";
import { Authorize, isAdmin } from "../middleWare/auth";
import * as controller from "../Controllers/admin.controller";

export const adminRoute = Router();

adminRoute.get("/students", Authorize, isAdmin, controller.listAllStudents);
adminRoute.get(
    "/submissions",
    Authorize,
    isAdmin,
    controller.getAllSubmissions
);
adminRoute.get(
    "/courses/:id/enrollments",
    Authorize,
    isAdmin,
    controller.getEnrollmentList
);
