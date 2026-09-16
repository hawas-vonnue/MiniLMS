import { Router } from "express";
import * as controller from "../Controllers/Auth.controller";
import { Authorize } from "../middleWare/auth";
import { validateRequest } from "../middleWare/validation";
import {
    loginUserSchema,
    logoutSchema,
    refreshTokenSchema,
    registerStudentSchema,
} from "../types/schema";

export const authRoute = Router();

authRoute.post(
    "/register",
    validateRequest(registerStudentSchema),
    controller.registerStudent
);
authRoute.post("/login", validateRequest(loginUserSchema), controller.login);
authRoute.post(
    "/refresh",
    validateRequest(refreshTokenSchema),
    controller.refresh
);
authRoute.post(
    "/logout",
    Authorize,
    validateRequest(logoutSchema),
    controller.logout
);
