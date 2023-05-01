'use client'

// Imports
import { useState } from "react";
import { useSession } from "next-auth/react"
import Image from "next/image"

// Styles
import styles from './profile.module.css'

// Icons
import closeIcon from "../../../public/icons/endpoint/close.svg"

//Components
import { Loader } from "../../../components/loader";

export default function LandingZone() { 

    const { data: session, status } = useSession()

    const [showResult, setShowResult] = useState(false);

    const handleChangePassword = () => {
        toggleModal();
    }

    const toggleModal = () => {
        let modal = document.querySelector(`.${styles.modalContainer}`);
        modal.classList.toggle(styles.hidden);
    }

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        let loader = document.querySelector(`.${styles.loader}`);
        let oldPassword = document.getElementById("oldPassword").value;
        let newPassword = document.getElementById("newPassword").value;
        let confirmNewPassword = document.getElementById("confirmNewPassword").value;
        
        if (newPassword === confirmNewPassword) {
            loader.classList.toggle(styles.hidden);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/Authorization/Users/ChangePassword`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: session.user.email,
                    password: oldPassword,
                    new_password: newPassword
                })
            })
            .then((res) => res.json().then((data) => {
                showEndpointResult(data, res.status);
            }))
        } else {
            //TODO: Not an error, just warning the user
            showEndpointResult("Les contrasenyes no coincideixen", 400)
        }
    }

    const showEndpointResult = (data, status) => {
        setShowResult(!showResult);

        let loader = document.querySelector(`.${styles.loader}`);
        loader.classList.toggle(styles.hidden);

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

    return (
        <div>

            <div className={[styles.modalContainer, styles.hidden].join(' ')}>
                <div className={styles.modal}>
                    <Image onClick={e => toggleModal()} src={closeIcon} alt="close" width={20} height={20}></Image>
                    <div className={styles.modalTitle}>
                        <p><strong>Change password</strong></p>
                    </div>
                    <div className={styles.modalBody}>
                        <div id="loaderContainer" className={[styles.loader, styles.hidden].join(' ')}>
                            <Loader></Loader>  
                        </div>
                        <form onSubmit={handleSubmitChangePassword}>
                            <div>
                                <label htmlFor="oldPassword">Old password</label>
                                <input type="password" name="oldPassword" id="oldPassword" />
                            </div>
                            <div>
                                <label htmlFor="newPassword">New password</label>
                                <input type="password" name="newPassword" id="newPassword" />
                            </div>
                            <div>
                                <label htmlFor="confirmNewPassword">Confirm new password</label>
                                <input type="password" name="confirmNewPassword" id="confirmNewPassword" />
                            </div>
                            <button type="submit">Change password</button>
                        </form>
                    </div>
                </div>
            </div>

            <h1>Profile</h1>
            <h3>· User profile  <span>- Basic profile info and settings.</span></h3>
            {
                status === "authenticated" && (
                    <div className={styles.profileWrapper}>
                        <div className={styles.profileContainer}>
                            <h4>Info</h4>
                            <div>
                                <span>Name: </span>
                                <input readOnly value={session.user.name} />
                            </div>
                            <div>
                                <span>Email: </span>
                                <input readOnly value={session.user.email } />
                            </div>
                            <div>
                                <span>Role: </span>
                                <input readOnly value={session.user.role } />
                            </div>

                            <button onClick={handleChangePassword}>
                                Change password
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}