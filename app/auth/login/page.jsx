import styles from "./Login.module.css";
import { InputButton } from "../../../components/Buttons/InputButton";
import { Form } from "../../../components/forms/Form";

export default function Login () {
    return (
        <body className={styles.body}>
            <div className={styles.loginWrapper}>
                <div className={styles.loginContainer}>
                    <h1>Iniciar sessió</h1>
                    <span>
                        Benvingut/da a l'eina web de gestió del Data Lake
                    </span>
                    <Form action={"/"} method={"POST"} className={styles.form}>
                        <InputButton type="text" parentId="username" label="Usuari" name="username" className={styles.active} />
                        <InputButton type="password" parentId="password" label="Contrasenya" name="password" className={styles.active} />
                        <button type="submit">Inicia</button>
                    </Form>
                </div>
            </div>
        </body>
    )
}