'use client'

import styles from "./Projects.module.css";

import { useEffect, useState } from "react";
import Link from "next/link";


export default function Projects() { 
    let [projects, setProjects] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/projects`)
        .then((res) => res.json())
        .then((data) => {
            setProjects(data);
        });
    }, []);

    return (
        <div>
            <h1>Projects</h1>
            <h3>· Selecciona el projecte  <span>- Conjunt de projectes disponibles al Data Lake.</span></h3>
            <div className={styles.projectsContainer}>
                <h4>Llistat de projectes disponibles</h4>
                {projects && projects.map((project) => {
                    return (
                        <div className={styles.project} key={project.id}>
                            <p>{project.name}</p>
                            <Link href={"/home/projects/" + project.id}>Endpoints</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}