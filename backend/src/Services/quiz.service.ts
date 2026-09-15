import { ConflictError, NotFoundError } from "../errors";
import * as repo from "../Repos/quiz.repo";

export async function getQuestions(quizId: number) {
    const result = await repo.fetchQuestions(quizId);

    return result;
}

export async function submitAnswer(
    studentEmail: string,
    quizId: number,
    submittedAnswer: Answer[]
) {
    let mark = 0;
    for (let answer of submittedAnswer) {
        const correctOption = await repo.getAnswer(answer.questionId);
        if (answer.option === correctOption) mark++;
    }

    const student = await repo.getStudentByEmail(studentEmail);
    if (!student) throw new NotFoundError("No such student");

    const alreadySubmitted = await repo.answerAlreadySubmitted(
        student.id,
        quizId
    );
    if (alreadySubmitted) throw new ConflictError("Already submitted");

    const result = await repo.submitScore(student.id, quizId, mark);

    return result;
}
