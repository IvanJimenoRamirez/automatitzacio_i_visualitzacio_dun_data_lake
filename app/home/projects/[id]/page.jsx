'use client'

import { useEffect, useState } from "react";
import { Endpoints } from "../../../../components/Endpoints/Tables/Endpoints";

export default function Project( { params }) {
    const {id} = params;

    let [project, setProject] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/projects/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setProject(data);
        });
    }, []);

    return (
        <div>
            <h1>Project {
                project && project.name
                }</h1>
            <h3>· Operacions <span>- Conjunt d'operacions disponibles al projecte.</span></h3>
            <Endpoints type="projects" id={id}></Endpoints>
        </div>
    )
}