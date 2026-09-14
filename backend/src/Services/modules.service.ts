import { NotFoundError } from "../errors";
import * as repo from "../Repos/modules.repo";

export async function addLesson(moduleId: number, lesson: Lesson) {
    const module = await repo.getModuleById(moduleId);
    if (!module) throw new NotFoundError("No such module");

    const result = await repo.addLesson(moduleId, lesson);

    return result;
}

export async function createQuizWithQuestions(
    moduleId: number,
    quiz: Quiz,
    questions: Question[]
) {
    const module = await repo.getModuleById(moduleId);
    if (!module) throw new NotFoundError("No such module");

    const result = await repo.createQuizWithQuestions(
        moduleId,
        quiz,
        questions
    );

    return result;
}
