import Link from "next/link";
import styles from "./admin.module.css";

export default function Admin() {
    return (
        <main className={styles.admin}>
        <h1>ADMIN</h1>
        <nav>
            <Link href="/admin/create">Create Account</Link>
            <Link href="/admin/login">Login</Link>
        </nav>
        </main>
    )
}