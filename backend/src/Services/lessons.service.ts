import { ConflictError, NotFoundError } from "../errors";
import * as repo from "../Repos/lessons.repo";

export async function markComplete(studentEmail: string, lessonId: number) {
    const student = await repo.getStudentByEmail(studentEmail);
    if (!student) throw new NotFoundError("Student not found");

    const studentId = student.id;

    const isAlreadyMarked = await repo.alreadyMarked(studentId, lessonId);
    if (isAlreadyMarked) throw new ConflictError("Already marked complete");

    const result = await repo.markComplete(studentId, lessonId);

    return result;
}
