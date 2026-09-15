import { Router } from "express";
import { Authorize, isAdmin, isStudent } from "../middleWare/auth";
import * as controller from "../Controllers/courses.controller";

export const courseRoute = Router();

courseRoute.post("/", Authorize, isAdmin, controller.createCourse);
courseRoute.put("/:id", Authorize, isAdmin, controller.editCourse);
courseRoute.patch("/:id/publish", Authorize, isAdmin, controller.publishCourse);
courseRoute.delete("/:id", Authorize, isAdmin, controller.deleteCourse);
courseRoute.post("/:id/modules", Authorize, isAdmin, controller.addModule);
courseRoute.get("/:id", Authorize, controller.getCourseDetails);
courseRoute.post("/:id/enroll", Authorize, isStudent, controller.enroll);
courseRoute.get("/", controller.listCourses);
