import pool from "@/lib/db";
import Link from "next/link";
import styles from "../admin.module.css";
import ManageProducts from "./products";

export default function Page() {

    return (
        <main className={styles.product}>
            <h1>my products</h1>
            <nav>
                <Link href="/admin/product/create">create product</Link>
            </nav>

            <ManageProducts />
        </main>
    )
}