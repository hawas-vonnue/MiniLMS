import { prisma } from "../../lib/prisma";

export async function markComplete(studentId: number, lessonId: number) {
    const result = await prisma.lessonCompleted.create({
        data: {
            studentId: studentId,
            lessonId: lessonId,
        },
    });

    return result;
}

export async function alreadyMarked(studentId: number, lessonId: number) {
    const result = await prisma.lessonCompleted.findUnique({
        where: {
            studentId_lessonId: {
                studentId: studentId,
                lessonId: lessonId,
            },
        },
    });

    return result;
}

export async function getStudentByEmail(email: string) {
    const student = await prisma.student.findUnique({
        where: {
            email: email,
        },
    });

    return student;
}
