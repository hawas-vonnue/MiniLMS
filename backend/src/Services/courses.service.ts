import { NotFoundError } from "../errors";
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
