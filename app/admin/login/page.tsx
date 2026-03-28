import Form from "./form";
import styles from "../admin.module.css";

export default function Page() {
    return (
        <main className={styles.login}>
            <h1>admin login</h1>
            <Form />
        </main>
    )
}