'use server'

import pool from "@/lib/db";
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

    if (!image || image.size === 0) {
        return {
            success: false,
            message: "image is required"
        }
    }

    //convert file
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //unique filename
    const filename = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`;

    //upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");

    //ensure folder exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true})
    }

    //full file path
    const filepath = path.join(uploadDir, filename);

    //save file
    fs.writeFileSync(filepath, buffer);

    //path to store in db
    const imageUrl = `/uploads/${filename}`;

    try {

        await pool.query(
            "INSERT INTO products (category, image, name, description, price) VALUES ($1, $2, $3, $4, $5)",
            [category, imageUrl, name, description, price]
        )

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