'use server'

import pool from "@/lib/db";
import fs from "fs";
import path from "path";


export async function fetchProducts(category: string) {
    try {

        const { rows } = await pool.query(
            "SELECT * FROM products WHERE category = $1",
            [category]
        )
        
        return rows;

    } catch (err) {
        console.error(err)
    }
}

export async function addStock(productId : number) {
    try {

        await pool.query(
            "UPDATE products SET stock = stock + 1 WHERE id = $1",
            [productId]
        )

        return;
    } catch (err) {
        console.error(err)
    }
}

export async function deleteProduct(productId : number) {
    try {

        const { rows } = await pool.query(
            "SELECT image FROM products WHERE id = $1",
            [productId]
        )

        const imageUrl = rows[0].image;

        if (imageUrl?.image) {

        const filePath = path.join(process.cwd(), "public", imageUrl?.image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        }

        await pool.query("DELETE FROM products WHERE id = $1", [productId]);

        return { 
            success: true 
        };
        
    } catch (err) {
        console.error(err)
    }
}