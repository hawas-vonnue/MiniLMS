import express from "express";
import { authRoute } from "./Routes/auth.routes";
import { errorHandler } from "./middleWare/errorHandler";
import { courseRoute } from "./Routes/courses.routes";
import { moduleRoute } from "./Routes/modules.routes";
import { adminRoute } from "./Routes/admin.routes";
import { lessonRoute } from "./Routes/lessons.routes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoute);
app.use("/api/modules", moduleRoute);
app.use("/api/admin", adminRoute);
app.use("/api/lessons", lessonRoute);

app.use(errorHandler);

app.listen(3000, () => console.log("server is listening on 3000"));
