'use client'

import styles from "./Login.module.css";
import { InputButton } from "./InputButton";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export function LoginContent ( { dict, lang }) {
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
            const availableLanguages = ["es-ES", "cat-ES", "en-US"];

            if (page !== null && page !== "/auth/login") {
              const hasLanguage = availableLanguages.some(language => page.includes(language));
              router.push(hasLanguage ? page : lang + "/" + page);
            }
            else router.push(`${lang}/home`);
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
                <div id="error" className={styles.error}>{dict.page.login.error} {errorStatus}</div>
            }
            <div className={styles.loginWrapper}>
                <div className={styles.loginContainer}>
                    <h1>{dict.page.login.title}</h1>
                    <span>
                        {dict.page.login.description}
                    </span>
                    <form onSubmit={ e => handleSubmit(e) } className={styles.form}>
                        <InputButton type="text" parentId="username" label={dict.page.login.user} name="username" className={styles.active} />
                        <InputButton type="password" parentId="password" label={dict.page.login.password} name="password" className={styles.active} />
                        <button type="submit">{dict.page.login.start}</button>
                    </form>
                </div>
            </div>
        </body>
    )
}