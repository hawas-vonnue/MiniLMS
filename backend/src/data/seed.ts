import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

async function seedAdmin() {
    const password1 = await bcrypt.hash("password1", 10);
    const password2 = await bcrypt.hash("password2", 10);
    await prisma.admin.createMany({
        data: [
            { name: "admin1", email: "admin1@gmail.com", password: password1 },
            { name: "admin2", email: "admin2@gmail.com", password: password2 },
        ],
    });
}

await seedAdmin();
