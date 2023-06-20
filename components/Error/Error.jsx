'use client'

// Imports
import Image from 'next/image'
import { signOut } from 'next-auth/react'

// Styles
import styles from './Error.module.css'

// Icons
import closeIcon from '../../public/icons/close.svg'

export function Error ({ message, status, action, dict, lang }) {
  if (status === 401) {
    signOut({
      callbackUrl: `/${lang}/auth/login`,
      redirect: true
    })
  } else {
    return (
      <div className={styles.modalError}>
        <div>
          <h3>{dict.commons.errors.title}</h3>
          <Image
            src={closeIcon}
            alt='close'
            width={20}
            height={20}
            onClick={action}
          />
          <p>
            {' '}
            <strong>{dict.commons.errors.status + ': '}</strong>{' '}
            <span className={styles.error}>{status}</span>
          </p>
          <p>
            {' '}
            <strong>{dict.commons.errors.message + ': '}</strong> {message}
          </p>
        </div>
      </div>
    )
  }
}
