import { NotFoundError } from "../errors";
import * as repo from "../Repos/admin.repo";

export async function listAllStudents() {
    const result = await repo.getAllStudents();

    return result;
}

export async function getEnrollmentList(courseId: number) {
    const course = await repo.getCourseById(courseId);
    if (!course) throw new NotFoundError();

    const result = await repo.getEnrollmentList(courseId);

    return result;
}

export async function getAllSubmissions(whereClause: WhereClause) {
    const result = await repo.getAllSubmissions(whereClause);

    return result;
}
