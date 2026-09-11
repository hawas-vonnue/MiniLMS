import { ConflictError } from "../errors";
import * as repo from "../Repos/auth.repo";
import bcrypt from "bcrypt";

export async function createStudent(student: Student) {
    const existingStudent = await repo.getStudentByEmail(student.email);
    if (existingStudent) throw new ConflictError("Already Registered Student");

    student.password = await bcrypt.hash(student.password, 10);

    const createdStudent = await repo.createStudent(student);

    return {
        id: createdStudent.id,
        name: createdStudent.name,
        email: createdStudent.email,
    };
}

// function generateJwtRefreshToken(data: {
//     id: number;
//     role: "student" | "admin";
// }) {
//     const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secret";
//     const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "30d";
//     const token = jwt.sign(data, JWT_REFRESH_SECRET, {
//         expiresIn: JWT_REFRESH_EXPIRY as jwt.SignOptions["expiresIn"],
//     });
//     return token;
// }
// export function refreshToken(refreshToken: string) {
//     try {
//         const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secret";

//         const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
//             id: number;
//             role: "student" | "admin";
//         };
//         const token = generateJwtAccessToken(decoded);
//         return {
//             status: 200,
//             send: { message: "Access token generation successfull", token },
//         };
//     } catch (err) {
//         if (err instanceof jwt.TokenExpiredError)
//             return { status: 401, send: { message: "Refresh Token Expired" } };
//         else if (err instanceof jwt.JsonWebTokenError) {
//             return { status: 401, send: { message: "Unauthorized" } };
//         }
//         return { status: 500, send: { message: "Internal Server Error" } };
//     }
// }
