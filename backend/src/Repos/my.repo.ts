import { prisma } from "../../lib/prisma";

export async function getCourseAndProgress(studentId: number) {
    const result = await prisma.student.findUnique({
        where: { id: studentId },
        include: {
            courses: {
                include: {
                    modules: {
                        include: {
                            lessons: {
                                include: {
                                    lessonComplete: {
                                        where: { studentId: studentId },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!result) return;

    const returnCourses = [];

    const courses = result.courses;

    for (let course of courses) {
        const modules = course.modules;

        let totalLessons = 0;
        let lessonsCompleted = 0;

        for (let module of modules) {
            let lessons = module.lessons;
            totalLessons = totalLessons + lessons.length;

            for (let lesson of lessons) {
                if (lesson.lessonComplete.length > 0) {
                    lessonsCompleted++;
                }
            }
        }

        let progress = Math.floor((lessonsCompleted / totalLessons) * 100);
        if (totalLessons === 0) progress = 100;

        const returnCourse = {
            ...course,
            progress,
        };

        returnCourses.push(returnCourse);
    }
    console.log(returnCourses);

    return returnCourses;
}

export async function getQuizSubmissions(studentId: number) {
    const result = await prisma.score.findMany({
        where: {
            studentId: studentId,
        },
        include: {
            quiz: true,
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
