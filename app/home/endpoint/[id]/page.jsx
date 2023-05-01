'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react"

//Components
import { Loader } from "../../../../components/loader";

//Styles
import styles from "./endpoint.module.css";

//Icons
import helpIcon from "../../../../public/icons/endpoint/help.svg"
import closeIcon from "../../../../public/icons/endpoint/close.svg"

export default function Endpoint( { params }) {
    const [endpoint, setEndpoint] = useState(false);
    const [jobs, setJobs] = useState(false);

    const [url, setUrl] = useState("");
    const [bodyParams, setBodyParams] = useState({});
    const [queryParams, setQueryParams] = useState({});
    const [pathParams, setPathParams] = useState({});

    const [showResult, setShowResult] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);

    const {id} = params;

    const { data: session, status } = useSession()

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/endpoint/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setEndpoint(data);
            if (data.jobs && data.jobs.length > 0) setJobs(data.jobs[0]);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = e.target.querySelectorAll("input");

        let queryParams = [];
        let qParams = {};
        let pathParams = {};
        let bodyParams = {};
        let url = endpoint.route;

        let isValid = true;
        let errorMsg = "";

        endpoint.parameters.forEach((param, index) => {
            if (param.location === "path") {
                pathParams[param.name] = params[index].value;
                url = url.replace(`{${param.name}}`, params[index].value);
            }
            else if (param.location === "query") {
                qParams[param.name] = params[index].value;
                queryParams.push(`${param.name}=${params[index].value}`);
            }
            else if (param.location === "body") bodyParams[param.name] = params[index].value;

            if (param.required && params[index].value === "") {
                isValid = false;
                errorMsg = `El paràmetre ${param.name} és requerit`;
            }
            if (param.type === "integer" && isNaN(params[index].value)) {
                isValid = false;
                errorMsg = `El paràmetre ${param.name} ha de ser un número`;
            }
        })

        if (!isValid) return alert(errorMsg);

        if (queryParams.length > 0) url = `${url}?${queryParams.join("&")}`;
        setUrl(url);
        setBodyParams(bodyParams);
        setQueryParams(qParams);
        setPathParams(pathParams);

        toggleModal();
    }

    const toggleModal = () => {
        document.querySelector(`.${styles.modalContainer}`).classList.toggle(styles.hidden);
    }

    const scheduleEndpoint = () => {
        // Get the schedule time from the scheduleContainer div, the input type datetime-local
        const scheduleTime = document.querySelector(`.${styles.scheduleContainer} input[type="datetime-local"]`).value;
        let seconds = document.querySelector(`.${styles.scheduleContainer} input[type="number"]`).value;

        // If the schedule time is empty, return
        if (scheduleTime === "") return alert("Has d'indicar una data i hora per a la planificació");

        // If the seconds are empty, set it to 0
        if (seconds === "") seconds = 0;

        // Get the endpoint id
        const endpointId = endpoint.id;

        // Merge the bodyParams and queryParams and pathParams
        const params = {...bodyParams, ...queryParams, ...pathParams};

        // Toggle the loader
        toggleLoader();

        // Send the request to the API
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/schedule-endpoint/${endpointId}/${seconds}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_API_KEY
            },
            body: JSON.stringify({
                "start_date": scheduleTime,
                "params": params
            })
        })
        .then((res) => res.json().then((data) => {
            showEndpointResult(data, res.status);
            setJobs(data);
        }))
        .catch((error) => {
            showEndpointResult(error, 500);
        });
    }

    const runEndpoint = () => {
        toggleLoader();

        let endpointUrl = `${process.env.NEXT_PUBLIC_API_URL + url}`;

        if (["PUT", "POST"].includes(endpoint.method)) {
            fetch(endpointUrl, {
                method: endpoint.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.accessToken}`
                },
                body: JSON.stringify(bodyParams)
            })
            .then((res) => res.json())
            .then((data) => {
                showEndpointResult(data, res.status)
            })
            .catch((error) => {
                showEndpointResult(error, 500);
            });
        } else {
            fetch(endpointUrl, {
                method: endpoint.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.accessToken}`
                },
            })
            .then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        showEndpointResult(data, res.status);
                    });
                } else {
                    showEndpointResult(res.statusText, res.status);
                }
            })
            .catch((error) => {
                showEndpointResult(error, 500)
            });
        }
    }

    const toggleLoader = () => {
        let loader = document.querySelector(`#loaderContainer`);
        loader.classList.toggle(styles.hidden);
    }

    const showEndpointResult = (data, status) => {
        setShowResult(!showResult);

        let modalBody = document.querySelector(`.${styles.modalBody}`);
        let title = document.querySelector(`.${styles.modalTitle}`);
        let result = document.createElement("div");

        let prettyData;
        try {
            // Try to parse the data
            const parsedData = JSON.parse(data);
            prettyData = JSON.stringify(parsedData, undefined, 2);
        } catch (error) {
            // If parsing fails, it's already a JSON object
            prettyData = JSON.stringify(data, undefined, 2);
        }

        title.innerHTML = `<p><strong>Resposta de la sol·licitud</strong></p>`;

        result.classList.add(styles.result);
        result.innerHTML = 
            `<p>
                <strong>Status:</strong> <span style="${(status >= 200 && status <= 200) ? 'color:#3dcf35' : 'color:#E63946'}">${status}</span>
            </p>
            <p>
                <strong>Resultat:</strong>
                <pre>${prettyData}</pre>
            </p>`;

        modalBody.innerHTML = result.outerHTML;
    }

    const handleShowSchedule = (checked) => {
        let scheduleContainer = document.querySelector(`.${styles.scheduleContainer}`);
        scheduleContainer.classList.toggle(styles.hidden);
        setIsScheduled(checked);
    }

    const handleDeleteJob = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/schedule-endpoint/stop_job/${jobs.job_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.status === 200) setJobs(false);
        });
    }


    return (
        <div>
            <div className={[styles.modalContainer, styles.hidden].join(' ')}>
                <div className={styles.modal}>
                    <Image onClick={e => toggleModal()} src={closeIcon} alt="close" width={20} height={20}></Image>
                    <div className={styles.modalTitle}>
                        <p><strong>Segur que vols executar l'endpoint?</strong></p>
                    </div>
                    <div className={styles.modalBody}>
                        <div id="loaderContainer" className={[styles.loader, styles.hidden].join(' ')}>
                            <Loader></Loader>  
                        </div>
                        <p><strong>URL: </strong> {url}</p>
                        <p><strong>Mètode: </strong> {endpoint && (
                            endpoint.method.toUpperCase()
                        )}</p>
                        <p><strong>Body: </strong>{JSON.stringify(bodyParams)} </p>
                        <div className={ (jobs) ? styles.hidden : "" }>
                            <p><strong>Programar execució:</strong> <input type="checkbox" onChange={
                                        (e) => handleShowSchedule(e.target.checked)
                                    } />
                            </p>
                            
                            <div className={[styles.scheduleContainer, styles.hidden].join(' ')}>
                                <hr />
                                <p><strong>Data inici: </strong> <input type="datetime-local" /> </p>
                                <p><strong>Repetir cada (segons)</strong> <input type="number"/> </p>
                            </div>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button
                                onClick={() => {
                                    if (isScheduled) {
                                    scheduleEndpoint();
                                    } else {
                                    runEndpoint();
                                    }
                                }}
                                >
                                Executa
                            </button>
                            <button onClick={toggleModal}>
                                Cancel·la
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Executa l'endpoint</h1>
            {
                endpoint && (
                    <>
                        <h3>· {endpoint.route}  <span>- {endpoint.summary}.</span></h3>
                        <p>
                            <strong>Descripció:</strong> {endpoint.description}
                        </p>
                        <div className={styles.endpointWrapper}>
                            {
                                jobs && (
                                    <div className={styles.jobWrapper}>
                                        <span>Job actiu</span> <Image src={closeIcon} onClick={e => handleDeleteJob() } alt="delete job" width={20} height={20}></Image>
                                    </div>
                                )
                            }
                            <h4>Configuració dels paràmetres requerits</h4>
                            <div className={styles.endpointParams}>
                                <form onSubmit={ e => handleSubmit(e) }>
                                {
                                    endpoint.parameters.map((param) => (
                                        <div key={param.id} className={styles.paramWrapper}>
                                            <div className={styles.paramDescription}>
                                                <p><strong>{param.name}:</strong> {param.description} <span>[{param.location}][{param.type}]</span> </p>
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