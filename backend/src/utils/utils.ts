import jwt from "jsonwebtoken";

export function generateJwtToken(
    data: {
        email: string;
        role: "admin" | "student";
    },
    jwtSecret: string,
    jwtExpiry: string
) {
    const token = jwt.sign(data, jwtSecret, {
        expiresIn: jwtExpiry as jwt.SignOptions["expiresIn"],
    });

    return token;
}
