import { prisma } from "../../lib/prisma";

export async function createCourse(course: Course) {
    const result = await prisma.course.create({
        data: { ...course },
    });

    return result;
}

export async function editCourse(id: number, course: CourseInput) {
    const result = await prisma.course.update({
        where: { id: id },
        data: {
            ...course,
        },
    });

    return result;
}

export async function publishCourse(id: number) {
    const result = await prisma.course.update({
        where: {
            id: id,
        },
        data: {
            publishStatus: true,
        },
    });

    return result;
}

export async function unpublishCourse(id: number) {
    const result = await prisma.course.update({
        where: {
            id: id,
        },
        data: {
            publishStatus: false,
        },
    });

    return result;
}

export async function deleteCourse(id: number) {
    const result = await prisma.course.delete({ where: { id: id } });

    return result;
}

export async function addModules(courseId: number, module: Module) {
    const result = await prisma.module.create({
        data: {
            courseId: courseId,
            title: module.title,
        },
    });

    return result;
}

export async function getCourseById(courseId: number) {
    const course = await prisma.course.findUnique({
        where: { id: courseId },
    });

    return course;
}
