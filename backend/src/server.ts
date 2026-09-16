import express from "express";
import cors from "cors";
import { authRoute } from "./Routes/auth.routes";
import { errorHandler } from "./middleWare/errorHandler";
import { courseRoute } from "./Routes/courses.routes";
import { moduleRoute } from "./Routes/modules.routes";
import { adminRoute } from "./Routes/admin.routes";
import { lessonRoute } from "./Routes/lessons.routes";
import { quizRoute } from "./Routes/quiz.routes";
import { myRoute } from "./Routes/my.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoute);
app.use("/api/modules", moduleRoute);
app.use("/api/admin", adminRoute);
app.use("/api/lessons", lessonRoute);
app.use("/api/quizzes", quizRoute);
app.use("/api/my", myRoute);

app.use(errorHandler);

app.listen(3000, () => console.log("server is listening on 3000"));
