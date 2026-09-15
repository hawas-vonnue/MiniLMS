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

export async function getCourseDetails(courseId: number) {
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            modules: {
                include: {
                    lessons: true,
                },
            },
        },
    });

    return course;
}

export async function enroll(studentId: number, courseId: number) {
    const result = await prisma.course.update({
        where: {
            id: courseId,
        },
        data: {
            enrolled: {
                connect: {
                    id: studentId,
                },
            },
        },
    });

    return result;
}

export async function alreadyEnrolled(studentId: number, courseId: number) {
    const count = await prisma.course.count({
        where: {
            id: courseId,
            enrolled: {
                some: {
                    id: studentId,
                },
            },
        },
    });

    return count > 0;
}

export async function getCourseById(courseId: number) {
    const course = await prisma.course.findUnique({
        where: { id: courseId },
    });

    return course;
}

export async function getStudentById(studentId: number) {
    const student = await prisma.student.findUnique({
        where: { id: studentId },
    });

    return student;
}

export async function getStudentByEmail(email: string) {
    const student = await prisma.student.findUnique({
        where: { email: email },
    });

    return student;
}

export async function getCourses(
    whereClause: CourseWhereClause,
    pageNumber: number,
    pageSize: number
) {
    const courses = await prisma.course.findMany({
        where: whereClause,
        take: pageSize,
        skip: (pageNumber - 1) * pageSize,
    });

    return courses;
}
