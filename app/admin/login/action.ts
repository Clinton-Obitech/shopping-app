'use server'

import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function SubmitForm(prevState: any, formData: FormData) {

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const SECRET = process.env.JWT_SECRET as string;
    const cookieStore = await cookies();

    if (!username || !password) {
        return {
            error: "complete both fields to continue"
        }
    }

    try {

        const admin = await prisma.admin.findUnique({
            where: {username: username}
        });


        if (!admin) {
            return {
                error: "admin does not exists"
            }
        }

        const matchPassword = await compare(password, admin.password);

        if (!matchPassword) {
            return {
                error: "invalid password"
            }
        }

        const adminToken = jwt.sign(
            {id: admin.id},
            SECRET,
            {expiresIn: "7d"}
        )

        cookieStore.set("adminToken", adminToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        })

        return {
            success: true,
            message: "login success"
        }

    } catch (err) {
        return {
            error: "something went wrong"
        }
    }
}