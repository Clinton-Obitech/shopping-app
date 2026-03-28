'use server'

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function SubmitForm(prevState:any, formData: FormData) {

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!username || !email || !password) {
        return {
            error: "complete all fields"
        }
    }

    try {
        
        const existingAdmin = await prisma.admin.findFirst({
            where: {
                 OR: [
                    { username: username },
                    { email: email}
                ]
            },
            select: {
                username: true,
                email: true
            }
        });

        if (existingAdmin?.username === username && existingAdmin?.email === email) {
             return {
                message: "credentials already exists",
                success: false
            }
        }

        if (existingAdmin?.username === username || existingAdmin?.email === email) {
             return {
                message: existingAdmin.email === email ? "email already exists" : "username already exists",
                success: false
            }
        }


        const hashPassword = await hash(password, 10);

        await prisma.admin.create({
            data: {
                username: username,
                email: email,
                password: hashPassword
            }
        });

        return {
            message: "account created successfully",
            success: true
        }

    } catch (err) {
        return {
            error: "something went wrong"
        }
    }
}