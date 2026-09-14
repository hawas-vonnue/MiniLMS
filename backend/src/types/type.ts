interface Student {
    name: string;
    email: string;
    password: string;
}

interface AuthorizedUser {
    email: string;
    role: "admin" | "student";
}
