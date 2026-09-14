import { Router } from "express";
import * as controller from "../Controllers/Auth.controller";
import { Authorize } from "../middleWare/auth";

export const authRoute = Router();

authRoute.post("/register", controller.registerStudent);
authRoute.post("/login", controller.login);
authRoute.post("/refresh", controller.refresh);
authRoute.post("/logout", Authorize, controller.logout);
