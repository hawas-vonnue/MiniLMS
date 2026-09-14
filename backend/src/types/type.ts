interface Student {
    name: string;
    email: string;
    password: string;
}

interface AuthorizedUser {
    email: string;
    role: "admin" | "student";
}

interface Course {
    name: string;
    description: string;
    createdBy: number;
    publishStatus: boolean;
    level: "Beginner" | "Intermediate" | "Advanced";
}

interface CourseInput {
    name?: string;
    description?: string;
    createdBy?: number;
    publishStatus?: boolean;
    level?: "Beginner" | "Intermediate" | "Advanced";
}

interface Module {
    title: string;
}

interface Lesson {
    content: string;
}

interface Quiz {
    title: string;
}

interface Question {
    question: string;
    correctOption: "A" | "B" | "C" | "D";
    options: string[];
}

interface WhereClause {
    studentId?: number;
    quizId?: number;
}
