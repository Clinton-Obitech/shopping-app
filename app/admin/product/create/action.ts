'use server'

import pool from "@/lib/db";
import supabase from "@/lib/supabaseServer";
import fs from "fs";
import path from "path";

type FormState = {
  message: string;
  success: boolean;
};

export async function createProduct(prevData: any, formData: FormData): Promise<FormState> {

    const category = formData.get("category") as string;
    const image = formData.get("image") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;

    if (!category || !name || !description || !price) {
        return {
            success: false,
            message: "complete all fields to continue"
        }
    }

    try {

        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, image);

        if (uploadError) {
            console.error(uploadError)
        }

        const { error: insertError } = await supabase
        .from('products')
        .insert([{
            category: category,
            image: fileName,
            name: name,
            description: description,
            price: price
        }]);

        if (insertError) {
            console.error(insertError)
        }

        return {
            success: true,
            message: "product created"
        }

    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "something went wrong"
        }
    }
}