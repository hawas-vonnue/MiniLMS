import { prisma } from "../../lib/prisma";

export async function addLesson(moduleId: number, lesson: Lesson) {
    const result = await prisma.lesson.create({
        data: {
            moduleId: moduleId,
            content: lesson.content,
        },
    });

    return result;
}

export async function getModuleById(moduleId: number) {
    const result = await prisma.module.findUnique({
        where: {
            id: moduleId,
        },
    });

    return result;
}

export async function createQuizWithQuestions(
    moduleId: number,
    quiz: Quiz,
    questions: Question[]
) {
    const result = await prisma.$transaction(async (tx) => {
        const createdQuiz = await tx.quiz.create({
            data: {
                title: quiz.title,
                moduleId: moduleId,
            },
        });

        const quizId = createdQuiz.id;
        const newQuestions = questions.map((question) => ({
            ...question,
            quizId: quizId,
        }));

        const questionsCreated = await tx.question.createMany({
            data: newQuestions,
        });

        return await tx.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: true,
            },
        });
    });

    return result;
}
