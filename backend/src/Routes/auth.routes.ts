import { Router } from "express";
import * as controller from "../Controllers/Auth.controller";

export const authRoute = Router();

authRoute.post("/register", controller.registerStudent);
