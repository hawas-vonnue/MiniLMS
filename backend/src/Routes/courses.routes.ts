import { Router } from "express";
import { Authorize, isAdmin, isStudent } from "../middleWare/auth";
import * as controller from "../Controllers/courses.controller";
import { validateRequest } from "../middleWare/validation";
import {
    addModuleSchema,
    createCourseSchema,
    editCourseSchema,
} from "../types/schema";

export const courseRoute = Router();

courseRoute.post(
    "/",
    Authorize,
    isAdmin,
    validateRequest(createCourseSchema),
    controller.createCourse
);
courseRoute.put(
    "/:id",
    Authorize,
    isAdmin,
    validateRequest(editCourseSchema),
    controller.editCourse
);
//no req.body so no validation here
courseRoute.patch("/:id/publish", Authorize, isAdmin, controller.publishCourse);
courseRoute.delete("/:id", Authorize, isAdmin, controller.deleteCourse);
courseRoute.post(
    "/:id/modules",
    Authorize,
    isAdmin,
    validateRequest(addModuleSchema),
    controller.addModule
);
courseRoute.get("/:id", Authorize, controller.getCourseDetails);
//no req.body so no validation here
courseRoute.post("/:id/enroll", Authorize, isStudent, controller.enroll);
courseRoute.get("/", controller.listCourses);
