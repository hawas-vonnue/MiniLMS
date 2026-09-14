import { ConflictError, UnauthorizedError } from "../errors";
import * as repo from "../Repos/auth.repo";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/utils";
import jwt from "jsonwebtoken";

interface CustomJwtPayload extends jwt.JwtPayload {
    email: string;
    role: "student" | "admin";
}

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

export async function login(data: {
    email: string;
    password: string;
    role: "student" | "admin";
}) {
    if (data.role === "student") {
        const hashedPassword = await repo.getStudentPasswordByEmail(data.email);
        if (!hashedPassword)
            throw new UnauthorizedError("invalid Email or password");

        const isSame = await bcrypt.compare(data.password, hashedPassword);
        if (!isSame) throw new UnauthorizedError("invalid Email or password");
    }

    if (data.role === "admin") {
        const hashedPassword = await repo.getAdminPasswordByEmail(data.email);
        if (!hashedPassword)
            throw new UnauthorizedError("invalid Email or password");

        const isSame = await bcrypt.compare(data.password, hashedPassword);
        if (!isSame) throw new UnauthorizedError("invalid Email or password");
    }
    const jwtExpiry = process.env.JWT_EXPIRY || "15m";
    const jwtSecret = process.env.JWT_SECRET || "secret";
    const jwtRefreshExpiry = process.env.JWT_REFRESH_EXPIRY || "30d";
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || "secret";

    const refreshToken = generateJwtToken(
        { email: data.email, role: data.role },
        jwtRefreshSecret,
        jwtRefreshExpiry
    );

    const accessToken = generateJwtToken(
        { email: data.email, role: data.role },
        jwtSecret,
        jwtExpiry
    );

    const decoded = jwt.decode(refreshToken) as jwt.JwtPayload;
    const expiresAt = new Date(decoded.exp! * 1000);

    if (data.role === "student")
        await repo.addStudentRefreshToken(data.email, refreshToken, expiresAt);
    if (data.role === "admin")
        await repo.addAdminRefreshToken(data.email, refreshToken, expiresAt);

    return {
        refreshToken,
        accessToken,
    };
}

export async function refresh(refreshToken: string) {
    const databaseToken = await repo.getRefreshToken(refreshToken);
    if (!databaseToken)
        throw new UnauthorizedError("Token is invalid or expired");
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secret";

    const decoded = jwt.verify(
        refreshToken,
        JWT_REFRESH_SECRET
    ) as CustomJwtPayload;
    const jwtExpiry = process.env.JWT_EXPIRY || "15m";
    const jwtSecret = process.env.JWT_SECRET || "secret";

    const payload = { ...decoded };
    delete payload.exp;
    delete payload.iat;

    const token = generateJwtToken(payload, jwtSecret, jwtExpiry);

    return token;
}

export async function logout(refreshToken: string) {
    const result = await repo.deleteRefreshToken(refreshToken);

    return result;
}
