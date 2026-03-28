import Form from "./form";
import styles from "../../admin.module.css";

export default function Page() {
    return (
        <main className={styles.createProduct}>
            <h1>create product</h1>
            <Form />
        </main>
    )
}