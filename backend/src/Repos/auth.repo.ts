import { prisma } from "../../lib/prisma";

export async function createStudent(student: Student) {
    const result = await prisma.student.create({
        data: {
            name: student.name,
            email: student.email,
            password: student.password,
        },
    });

    return result;
}

export async function getStudentByEmail(email: string) {
    const student = await prisma.student.findUnique({
        where: { email: email },
    });

    return student;
}
