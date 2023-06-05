"use client";

// Styles
import styles from "./CustomHeader.module.css";

// Imports
import { useSession } from "next-auth/react"

export function UserName({ dict }) {
    const { data: session, status } = useSession()

    return (
        <div className={styles.nameContainer}>
            {status === "loading" ? (
                <span>{dict.commons.loading}</span>
            ) : (
                <span>{dict.header.welcomeBack + ", "} <span className={styles.username}>{session.user.name}</span></span>
            )}
        </div>
    )
}