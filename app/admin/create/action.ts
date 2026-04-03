'use server'

import supabase from "@/lib/supabaseServer";
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

        const { data: existingAdmin, error: existingError } = await supabase
        .from('admin')
        .select('username, email')
        .or(`username.eq.${username}, email.eq.${email}`)
        .single();

        if (existingError) {
            console.log(existingError)
        }

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

        const { data, error: insertError } = await supabase
        .from('admin')
        .insert([
            {
                username: username,
                email: email,
                password: hashPassword
            }
        ]);

        if (insertError) {
            console.error(insertError)
        }

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