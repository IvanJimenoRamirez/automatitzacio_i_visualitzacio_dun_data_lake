'use client'

// Imports
import { useState } from 'react';

//Components
import { Loader } from "../../../components/loader";

// Styles
import styles from './Admin.module.css'

export default function Admin() {

    const [showResult, setShowResult] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleRefreshEndpoints = () => {
        let loader = document.querySelector(`#loader`);
        let button = document.querySelector(`.${styles.refreshEndpoints} button`);
        button.classList.toggle(styles.hidden);
        loader.classList.toggle(styles.hidden);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/updateEndpoints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json().then((data) => {
            let message = "";
            if (res.status === 200) {
                message = `The endpoints have been updated correctly`;
                setIsError(false);
            } 
            else {
                message = `There has been an error updating the endpoints. Status code: ${res.status}`;
                setIsError(true);
            }
            loader.classList.toggle(styles.hidden);
            button.classList.toggle(styles.hidden);
            setShowResult(message);
            setTimeout(hideResult, 3000);
        }
        ))
    }

    const hideResult = () => {
        setShowResult(false);
    }


    return (
        <div className={styles.relative}>
            {
                showResult ?
                <div id="result" className={`${styles.modal} ${(isError) ? styles.error : styles.success}`}>
                    <p>{showResult}</p>
                </div>
                :
                <></>
            }
            <h1>Admin </h1>
            <h3>· Administration Pannel <span>- Manage data lake authentication  </span></h3>
            <div>
                <h4>Manage users</h4>
                <h4>Manage api keys</h4>
            </div>
            <h3>· Endpoint configuration <span>- Refresh the endpoints available in the web tool (updates, deletes and creates endpoints acording to the last Data Lake version)</span></h3>
            <div className={styles.refreshEndpoints}>
                <div id="loader" className={styles.hidden}>
                    <Loader />
                </div>
                <button onClick={handleRefreshEndpoints} >Refresh</button>
            </div>
        </div>
    )
}