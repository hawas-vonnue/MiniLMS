import z from "zod";

export const registerStudentSchema = z.object({
    body: z.object({
        name: z.string().nonempty(),
        email: z.email().nonempty(),
        password: z.string().nonempty(),
    }),
});

export const loginUserSchema = z.object({
    body: z.object({
        email: z.email().nonempty(),
        password: z.string().nonempty(),
        role: z.literal(["admin", "student"]),
    }),
});

export const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.jwt().nonempty(),
    }),
});

export const logoutSchema = z.object({
    body: z.object({
        refreshToken: z.jwt().nonempty(),
    }),
});

export const createCourseSchema = z.object({
    body: z.object({
        name: z.string().nonempty(),
        description: z.string().nonempty(),
        createdBy: z.number().nonnegative(),
        publishStatus: z.boolean(),
        level: z.literal(["Beginner", "Intermediate", "Advanced"]),
    }),
});

export const editCourseSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        publishStatus: z.boolean().optional(),
        level: z.literal(["Beginner", "Intermediate", "Advanced"]).optional(),
    }),
    params: z.object({
        id: z.coerce.number(),
    }),
});

export const addModuleSchema = z.object({
    body: z.object({
        title: z.string().nonempty(),
    }),
});

export const addLessonSchema = z.object({
    body: z.object({
        content: z.string().nonempty(),
    }),
});

export const addQuizSchema = z.object({
    body: z.object({
        quiz: z.object({
            title: z.string().nonempty(),
        }),
        questions: z.array(
            z.object({
                question: z.string().nonempty(),
                options: z
                    .array(z.string())
                    .length(4, "there should be 4 options"),
                correctOption: z.literal(
                    ["A", "B", "C", "D"],
                    "only acceptable options are A,B,C,D"
                ),
            })
        ),
    }),
});

export const submitAnswerSchema = z.object({
    body: z.object({
        answers: z.array(
            z.object({
                questionId: z.number().nonnegative(),
                option: z.literal(
                    ["A", "B", "C", "D"],
                    "only acceptable options are A,B,C,D"
                ),
            })
        ),
    }),
});
