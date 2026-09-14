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

export async function getStudentPasswordByEmail(email: string) {
    const student = await prisma.student.findUnique({
        select: {
            password: true,
        },
        where: { email: email },
    });

    return student?.password;
}

export async function getAdminPasswordByEmail(email: string) {
    const admin = await prisma.admin.findUnique({
        select: { password: true },
        where: { email: email },
    });

    return admin?.password;
}

export async function addAdminRefreshToken(
    email: string,
    token: string,
    expiresAt: Date
) {
    await prisma.refreshToken.create({
        data: {
            token: token,
            expiresAt: expiresAt,
            adminEmail: email,
        },
    });
}

export async function addStudentRefreshToken(
    email: string,
    token: string,
    expiresAt: Date
) {
    await prisma.refreshToken.create({
        data: {
            token: token,
            expiresAt: expiresAt,
            studentEmail: email,
        },
    });
}

export async function getRefreshToken(token: string) {
    return await prisma.refreshToken.findUnique({
        where: { token: token },
        include: {
            student: true,
            admin: true,
        },
    });
}

export async function deleteRefreshToken(token: string) {
    return await prisma.refreshToken.delete({
        where: {
            token: token,
        },
    });
}
