import { NotFoundError, UnauthorizedError } from "../errors";
import * as repo from "../Repos/my.repo";

export async function getMyCourses(studentEmail: string) {
    const student = await repo.getStudentByEmail(studentEmail);
    if (!student) throw new UnauthorizedError();

    const result = await repo.getCourseAndProgress(student.id);

    if (!result) throw new NotFoundError();

    return result;
}

export async function getMyQuizHistory(studentEmail: string) {
    const student = await repo.getStudentByEmail(studentEmail);
    if (!student) throw new UnauthorizedError();

    const result = await repo.getQuizSubmissions(student.id);

    return result;
}
