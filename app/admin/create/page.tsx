import Form from "./form";
import styles from "../admin.module.css";

export default function Page() {
    return (
        <main className={styles.create}>
            <h1>create admin</h1>
            <Form />
        </main>
    )
}