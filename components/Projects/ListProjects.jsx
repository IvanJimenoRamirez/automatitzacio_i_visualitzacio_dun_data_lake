'use client'

// Imports
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

// Components
import { Error } from '../Error/Error'

export function ListProjects ({ lang, styles, dict }) {
  const [projects, setProjects] = useState(false)

  const [errorMessage, setErrorMessage] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/projects`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`
          }
        })
        .then(async (res) => {
          if (res.status === 401) {
            await signOut({
              callbackUrl: `/${lang}/auth/login`,
              redirect: true
            })
          }
          res.json().then((data) => {
            setProjects(data)
          })
            .catch((err) => {
              setErrorMessage(err.message)
              setErrorStatus(500)
            })
        })
    }
  }, [session])

  return (
    <>
      {errorMessage ? <Error status={errorStatus} message={errorMessage} action={() => { setErrorMessage(false); setErrorStatus(false) }} dict={dict} lang={lang} /> : ''}
      {projects && projects.length > 0
        ? (
            projects.map((project) => {
              return (
                <div className={styles.project} key={project.id}>
                  <p>{project.name}</p>
                  <Link href={`/${lang}/home/projects/` + project.id}>Endpoints</Link>
                </div>
              )
            })
          )
        : (
          <p>{dict.commons.noContent}</p>
          )}
    </>
  )
}
