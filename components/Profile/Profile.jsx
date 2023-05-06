'use client'

// Imports
import { useState } from "react";
import { useSession } from "next-auth/react"

//Components
import { Loader } from "../loader";
import { Modal } from "../Modal/Modal";

export function ProfileTable ({lang, styles, dict}) {
    // Session
    const { data: session, status } = useSession()

    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [modalActions, setModalActions] = useState([]);

    const [showResult, setShowResult] = useState(false);

    const changePasswordModal = () => {
        setModalTitle(dict.page.profile.modal.changePassword);
        setModalContent(
            <>
                <div id="loaderContainer" className={[styles.loader, styles.hidden].join(' ')}>
                    <Loader></Loader>  
                </div>
                <form>
                    <div>
                        <label htmlFor="oldPassword">{dict.page.profile.modal.oldPassword}</label>
                        <input type="password" name="oldPassword" id="oldPassword" />
                    </div>
                    <div>
                        <label htmlFor="newPassword">{dict.page.profile.modal.newPassword}</label>
                        <input type="password" name="newPassword" id="newPassword" />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword">{dict.page.profile.modal.repeatNewPassword}</label>
                        <input type="password" name="confirmNewPassword" id="confirmNewPassword" />
                    </div>
                </form>
            </>
        );
        setModalActions([
          { label: dict.commons.cancel, onClick: () => setModalOpen(false) },
          {
            label: dict.commons.change,
            onClick: () => {
                handleSubmitChangePassword()
            },
          },
        ]);
        setModalOpen(true);
      }

    const handleSubmitChangePassword = () => {
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

        result.classList.add(styles.result);

        setModalContent(
            <div>
                <p>
                    <strong>{dict.commons.status}:</strong> <span style={(status >= 200 && status <= 200) ? styles.error : styles.success}>{status}</span>
                </p>
                <p>
                    <strong>{dict.commons.result}:</strong>
                </p>
                <pre>{prettyData}</pre>
            </div>
        );
        setModalTitle(dict.commons.response);
        setModalActions([
            { label: dict.commons.cancel, onClick: () => setModalOpen(false) },
        ]);
    }


    return (
        <>
            <Modal
                isOpen={modalOpen}
                title={modalTitle}
                content={modalContent}
                onClose={() => setModalOpen(false)}
                actions={modalActions}
            />
            {
                status === "authenticated" && (
                    <div className={styles.profileWrapper}>
                        <div className={styles.profileContainer}>
                            <h4>{dict.page.profile.info}</h4>
                            <div>
                                <span>{dict.page.profile.userData.name}: </span>
                                <input readOnly value={session.user.name} />
                            </div>
                            <div>
                                <span>{dict.page.profile.userData.email}: </span>
                                <input readOnly value={session.user.email } />
                            </div>
                            <div>
                                <span>{dict.page.profile.userData.role}: </span>
                                <input readOnly value={session.user.role } />
                            </div>

                            <button onClick={changePasswordModal}>
                            {dict.page.profile.userData.changePassword}
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )

}