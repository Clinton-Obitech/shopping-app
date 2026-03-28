'use server'

import pool from "@/lib/db";
import { hash } from "bcryptjs";

type FormState = {
  message: string;
  success: boolean;
};

export async function SubmitForm(prevState:any, formData: FormData): Promise<FormState> {

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!username || !email || !password) {
        return {
            success: false,
            message: "complete all fields"
        }
    }

    try {

        const { rows } = await pool.query(
            "SELECT username, email FROM admin WHERE username = $1 OR email = $2",
            [username, email]
        )
        
        const existingAdmin = rows[0];

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

        await pool.query(
            "INSERT INTO admin (username, email, password) VALUES ($1, $2, $3)",
            [username, email, hashPassword]
        )

        return {
            message: "account created successfully",
            success: true
        }

    } catch (err) {
        return {
            success: false,
            message: "something went wrong"
        }
    }
}