import Link from "next/link";
import styles from "../admin.module.css";

export function ProductCard() {
    return (
        <section className={styles.card}>
            <h3>products</h3>
            <nav>
                <Link href="/admin/product">manage</Link>
            </nav>
        </section>
    )
}