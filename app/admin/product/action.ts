'use server'

import pool from "@/lib/db";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";


export async function fetchProducts(category: string) {
    try {
        
        const result = await prisma.products.findMany({
            where: { category: category},
            select: {
                id: true,
                category: true,
                image: true,
                name: true,
                description: true,
                price: true,
                stock: true
            }
        });

        const formatted = result.map(p => (
            {...p, price: Number(p.price)}
        ))

        return formatted;

    } catch (err) {
        console.error(err)
    }
}

export async function addStock(productId : number) {
    try {

        await prisma.products.update({
            where: {id: productId},
            data: {
                stock: {increment: 1}
            }
        })

        return;
    } catch (err) {
        console.error(err)
    }
}

export async function deleteProduct(productId : number) {
    try {

        const imageUrl = await prisma.products.findUnique({
            where: {id: productId},
            select: {
                image:true
            }
        });

        if (imageUrl?.image) {

        const filePath = path.join(process.cwd(), "public", imageUrl?.image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        }

        await prisma.products.delete({
            where: {id: productId}
        })


        return { success: true };
    } catch (err) {
        console.error(err)
    }
}