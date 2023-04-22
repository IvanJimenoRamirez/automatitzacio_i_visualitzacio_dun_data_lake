'use client'

import { useEffect, useState } from "react";

export default function Endpoint( { params }) {
    const [endpoint, setEndpoint] = useState(false);

    const {id} = params;

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/DataLakeAPI/endpoint/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("That's the data: ", data);
            setEndpoint(data);
        });
    }, []);

    return (
        <div>
            <h1>Executa l'endpoint</h1>
            {
                endpoint && (
                    <>
                        <h3>· {endpoint.name}  <span>- {endpoint.description}.</span></h3>
                        <div></div>
                    </>
                )
            }
        </div>
    )
}