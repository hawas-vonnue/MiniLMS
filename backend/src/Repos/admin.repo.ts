import { prisma } from "../../lib/prisma";

export async function getAllStudents() {
    const result = await prisma.student.findMany();

    return result;
}

export async function getEnrollmentList(courseId: number) {
    const result = await prisma.course.findUnique({
        where: { id: courseId },
        include: { enrolled: true },
    });

    return result?.enrolled;
}

export async function getAllSubmissions(whereClause: WhereClause) {
    const result = await prisma.score.findMany({
        where: whereClause,
        include: {
            student: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
            quiz: {
                select: {
                    id: true,
                    title: true,
                    moduleId: true,
                },
            },
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
