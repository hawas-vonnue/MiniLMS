import express from "express";
import { authRoute } from "./Routes/auth.routes";
import { errorHandler } from "./middleWare/errorHandler";

const app = express();

app.use(express.json());

app.use("/auth", authRoute);

app.use(errorHandler);

app.listen(3000, () => console.log("server is listening on 3000"));
