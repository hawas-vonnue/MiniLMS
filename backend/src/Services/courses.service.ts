import { ConflictError, NotFoundError, UnauthorizedError } from "../errors";
import * as repo from "../Repos/courses.repo";

export async function createCourse(course: Course) {
    const result = await repo.createCourse(course);

    return result;
}

export async function editCourse(courseId: number, courseInput: CourseInput) {
    const course = await repo.getCourseById(courseId);
    if (!course) throw new NotFoundError();

    const result = await repo.editCourse(courseId, courseInput);

    return result;
}

export async function publishCourse(courseId: number) {
    const course = await repo.getCourseById(courseId);
    if (!course) throw new NotFoundError();

    let result;

    if (course.publishStatus) result = await repo.unpublishCourse(courseId);
    else result = await repo.publishCourse(courseId);

    return result;
}

export async function deleteCourse(courseId: number) {
    const course = await repo.getCourseById(courseId);
    if (!course) throw new NotFoundError();

    const result = await repo.deleteCourse(courseId);

    return result;
}

export async function addModule(courseId: number, module: Module) {
    const course = await repo.getCourseById(courseId);
    if (!course) throw new NotFoundError();

    const result = await repo.addModules(courseId, module);

    return result;
}

export async function getCourseDetails(courseId: number) {
    const result = await repo.getCourseDetails(courseId);

    return result;
}

export async function enroll(studentEmail: string, courseId: number) {
    const course = await repo.getCourseById(courseId);
    if (!course) throw new NotFoundError("No such course");

    const student = await repo.getStudentByEmail(studentEmail);
    if (!student) throw new NotFoundError("No such student");

    const studentId = student.id;

    if (await repo.alreadyEnrolled(studentId, courseId))
        throw new ConflictError("Already Enrolled");

    const result = await repo.enroll(studentId, courseId);

    return result;
}

export async function listCourses(
    whereClause: CourseWhereClause,
    pageNumber: number,
    pageSize: number
) {
    const courses = await repo.getCourses(whereClause, pageNumber, pageSize);

    return courses;
}
