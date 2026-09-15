import { prisma } from "../../lib/prisma";

export async function fetchQuestions(quizId: number) {
    const result = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
            questions: {
                select: {
                    question: true,
                    options: true,
                    id: true,
                },
            },
        },
    });

    return result;
}

export async function getAnswer(questionId: number) {
    const question = await prisma.question.findUnique({
        where: { id: questionId },
    });

    if (!question) return;

    const correctOption = question.correctOption;

    return correctOption;
}

export async function submitScore(
    studentId: number,
    quizId: number,
    score: number
) {
    const result = await prisma.score.create({
        data: {
            studentId: studentId,
            quizId: quizId,
            points: score,
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

export async function answerAlreadySubmitted(
    studentId: number,
    quizId: number
) {
    const result = await prisma.score.findUnique({
        where: {
            studentId_quizId: {
                studentId: studentId,
                quizId: quizId,
            },
        },
    });

    return result;
}
