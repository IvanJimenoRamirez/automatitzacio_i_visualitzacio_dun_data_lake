'use client'

// Imports
import { useEffect, useState } from "react";
import Link from "next/link";

// Components
import { Error } from "../Error/Error";

export function ListProjects ({lang, styles, dict }) {
    let [projects, setProjects] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/projects`)
        .then((res) => res.json())
        .then((data) => {
            setProjects(data);
        })
        .catch((err) => {
            setErrorMessage(err.message);
            setErrorStatus(500);
        });
    }, []);

    return (
        <>
            {errorMessage ? <Error status={errorStatus} message={errorMessage} action={() => { setErrorMessage(false); setErrorStatus(false) }} dict={dict} lang={lang} /> : ""}
            {projects && projects.map((project) => {
                return (
                    <div className={styles.project} key={project.id}>
                        <p>{project.name}</p>
                        <Link href={`/${lang}/home/projects/` + project.id}>Endpoints</Link>
                    </div>
                )
            })}
        </>
    )
}