'use client'

import styles from "./Login.module.css";
import { InputButton } from "../../../components/Auth/InputButton";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login () {
    const [errorStatus, seterrorStatus] = useState(null);

    const router = useRouter(); 

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = document.getElementById("username").querySelector("input").value;
        const password = document.getElementById("password").querySelector("input").value;

        const res = await signIn('credentials', { username: username, password: password, redirect: false });
        if (res.status === 200) {
            // Get the user requested page from the url (?p=page)
            const urlParams = new URLSearchParams(window.location.search);
            const page = urlParams.get('p');
            if (page !== null) router.push(page);
            else router.push("/home");
        } else {
            seterrorStatus(res.status);
            setTimeout(() => {
                seterrorStatus(null);
            }, 4000);
        }
    }

    return (
        <body className={styles.body}>
            {
                errorStatus && 
                <div id="error" className={styles.error}>Incorrect user or password. Error code: {errorStatus}</div>
            }
            <div className={styles.loginWrapper}>
                <div className={styles.loginContainer}>
                    <h1>Login</h1>
                    <span>
                        Welcome to the Data Lake web management tool.
                    </span>
                    <form onSubmit={ e => handleSubmit(e) } className={styles.form}>
                        <InputButton type="text" parentId="username" label="User" name="username" className={styles.active} />
                        <InputButton type="password" parentId="password" label="Password" name="password" className={styles.active} />
                        <button type="submit">Start</button>
                    </form>
                </div>
            </div>
        </body>
    )
}