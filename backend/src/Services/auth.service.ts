import { ConflictError } from "../errors";
import * as repo from "../Repos/auth.repo";

export async function createStudent(student: Student) {
    const existingStudent = await repo.getStudentByEmail(student.email);
    if (existingStudent) throw new ConflictError("Already Registered Student");

    const createdStudent = await repo.createStudent(student);

    return {
        id: createdStudent.id,
        name: createdStudent.name,
        email: createdStudent.email,
    };
}
