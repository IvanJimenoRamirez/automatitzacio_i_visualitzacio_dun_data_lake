/* eslint-disable react/jsx-handler-names */
// Imports
import Image from 'next/image'

// Styles
import styles from './Modal.module.css'

// Icons
import closeIcon from '../../public/icons/close.svg'

export function Modal ({ isOpen, title, content, onClose, actions }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <Image
          onClick={e => {
            const modal = document.querySelector(`.${styles.modalContainer}`)
            modal.classList.toggle(styles.hidden)
            onClose()
          }}
          src={closeIcon}
          alt='close'
          width={20}
          height={20}
        />
        <div className={styles.modalTitle}>
          <p>
            <strong>{title}</strong>
          </p>
        </div>
        <div className={styles.modalBody}>{content}</div>
        <div className={styles.modalFooter}>
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={styles.modalAction}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
