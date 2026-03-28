'use server'

import pool from "@/lib/db";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function createProduct(prevData: any, formData: FormData) {

    const category = formData.get("category") as string;
    const image = formData.get("image") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;

    if (!category || !name || !description || !price) {
        return {
            error: "complete all fields to continue"
        }
    }

    if (!image || image.size === 0) {
        return {
            error: "image is required"
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

        await prisma.products.create({
            data: {
                category: category,
                image: imageUrl,
                name: name,
                description: description,
                price: price
            }
        });

        return {
            message: "product created"
        }

    } catch (err) {
        console.error(err);
        return {
            error: "something went wrong"
        }
    }
}