'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

//Styles
import styles from "./endpoint.module.css";

//Icons
import helpIcon from "../../../../public/icons/endpoint/help.svg"

export default function Endpoint( { params }) {
    const [endpoint, setEndpoint] = useState(false);

    const {id} = params;

    /* 
    Endpoint example:
        {
            "id": 1,
            "route": "/DataLakeAPI/temporalLandingZone/{source}/{file_name}/exists",
            "project_id": null,
            "name": "Existeix fitxer",
            "method": "GET",
            "zone_id": 1,
            "description": "Comproba si un fitxer existeix per la font de dades indicada",
            "parameters": [
                {
                    "endpoint_id": 1,
                    "name": "file_name",
                    "description": "Nom del arxiu",
                    "param_type": "path",
                    "id": 1,
                    "required": true
                },
                {
                    "endpoint_id": 1,
                    "name": "source",
                    "description": "Nom de la font de dades",
                    "param_type": "path",
                    "id": 2,
                    "required": true
                }
            ]
        }
    */

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/DataLakeAPI/endpoint/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("That's the data: ", data);
            setEndpoint(data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = e.target.querySelectorAll("input");
        const paramsArray = [];

    }

    return (
        <div>
            <h1>Executa l'endpoint</h1>
            {
                endpoint && (
                    <>
                        <h3>· {endpoint.name}  <span>- {endpoint.description}.</span></h3>
                        <div className={styles.endpointWrapper}>
                            <h4>Configuració dels paràmetres requerits</h4>
                            <div className={styles.endpointParams}>
                                <form onSubmit={ e => handleSubmit(e) }>
                                {
                                    endpoint.parameters.map((param) => (
                                        <div className={styles.paramWrapper}>
                                            <div className={styles.paramDescription}>
                                                <p><strong>{param.name}:</strong> {param.description} [{param.param_type}] </p>
                                            </div>
                                            <div className={styles.inputContainer}>
                                                <input type="text" placeholder={param.name} />
                                                <Image src={helpIcon} alt="Help" width={20} height={20} ></Image>
                                            </div>
                                        </div>
                                    ))
                                }
                                    <div className={styles.buttonContainer}>
                                        <button>
                                            Executa
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}