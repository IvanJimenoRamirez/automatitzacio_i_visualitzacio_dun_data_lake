import styles from "./Login.module.css";

export default function Login () {
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <h1>Data lake App</h1>
                <form onSubmit={handleLogin()}>
                    <input type="text" />
                    <input type="password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}