'use server'

import pool from "./db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

export const getAdmin = async () => {

    const cookieStore = await cookies();

    const adminToken = cookieStore.get("adminToken")?.value;
    const SECRET = process.env.JWT_SECRET as string;

    if (!adminToken) {
        return null;
    }

    try {
        const decoded = jwt.verify(adminToken, SECRET) as { id: number };
        const adminId = decoded.id;

        /*const { rows } = await pool.query(
            "SELECT username, email, role FROM admin WHERE id = $1",
            [adminId]
        )*/

        const admin = await prisma.admin.findUnique({
            where: {id: adminId},
            select: {
                username: true,
                email: true,
                role: true
            }
        });

        if (!admin || admin.role !== "admin") {
            return null;
        }

        return admin;

    } catch (err) {
        console.error(err);
        throw err;
    }
}