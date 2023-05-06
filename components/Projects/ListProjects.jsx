'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

export function ListProjects ({lang, styles}) {
    let [projects, setProjects] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/projects`)
        .then((res) => res.json())
        .then((data) => {
            setProjects(data);
        });
    }, []);

    return (
        <>
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