'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function AdminPage() {
    const { data: session, status } = useSession()
    return (
        <div>
            <h1>Admin Page - Only accessible by the administrator</h1>
            <h2>Session: </h2>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <h2>Status: </h2>
            <pre>{JSON.stringify(status, null, 2)}</pre>
            <button onClick={() => signIn()}>Sign in</button>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}