'use server'

import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import supabase from "@/lib/supabaseServer";

type FormState = {
  message: string;
  success: boolean;
};

export async function SubmitForm(prevState: any, formData: FormData):  Promise<FormState> {

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const SECRET = process.env.JWT_SECRET as string;
    const cookieStore = await cookies();

    if (!username || !password) {
        return {
            success: false,
            message: "complete both fields to continue"
        }
    }

    try {

        const { data: admin, error } = await supabase
        .from('admin')
        .select('*')
        .eq('username', username)
        .single();

        if (error) {
            return {
               success: false,
               message: "something went wrong"
            }
        }

        if (!admin) {
            return {
                success: false,
                message: "admin does not exists"
            }
        }

        const matchPassword = await compare(password, admin.password);

        if (!matchPassword) {
            return {
                success: false,
                message: "invalid password"
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
            success: false,
            message: "something went wrong"
        }
    }
}