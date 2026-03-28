import { getAdmin } from "@/lib/admin"
import { redirect } from "next/navigation";
import { LogoutButton } from "../components/logout";
import styles from "../admin.module.css";
import { ProductCard } from "../components/product-card";

export default async function Page() {

    const admin = await getAdmin();

    if (!admin) return redirect("/admin");

    return (
        <main className={styles.dashboard}>
            <section className={styles.top}>
                 <h1>{admin.username} Dashboard</h1>
            <LogoutButton />
            </section>

            <section className={styles.cards}>
                <ProductCard />
            </section>
        </main>
    )
}