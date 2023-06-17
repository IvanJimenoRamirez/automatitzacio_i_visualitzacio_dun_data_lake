'use client'

import styles from './CustomHeader.module.css'

// Imports
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function LanguageSelector ({ dict }) {
  const router = useRouter()
  const pathname = usePathname()

  const [activeLanguage, setActiveLanguage] = useState('')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const currentLanguage = pathname.split('/')[1]
    if (activeLanguage !== currentLanguage) setActiveLanguage(currentLanguage)
  }, [pathname])

  // Declare util variables
  const availableLanguages = ['en-US', 'cat-ES', 'es-ES']

  const lightTheme = {
    '--color-primary': '#1D3557',
    '--color-secondary': '#457B9D',
    '--color-quaternary': '#E63946',
    '--color-button': '#658ec2',
    '--color-button-hover': '#5c7ca9',
    '--color-white': '#fff',
    '--navbar-hover': '#D3E3FD',
    '--color-hard-grey': '#333',
    '--color-grey': '#848F9F',
    '--color-low-grey': '#ddd',
    '--color-body': '#F5F8FC',
    '--box-shadow-color': 'rgba(0, 0, 0, 0.182)',
    '--white-filter':
      'invert(100%) sepia(100%) saturate(0%) hue-rotate(127deg) brightness(103%) contrast(103%)',
    '--dark-filter':
      'invert(0%) sepia(0%) saturate(0%) hue-rotate(127deg) brightness(103%) contrast(103%)',
    '--modal-background': 'rgba(0, 0, 0, 0.5)'
  }
  const darkTheme = {
    '--color-primary': '#FFF',
    '--color-secondary': '#A8DADC',
    '--color-quaternary': '#E63946',
    '--color-button': '#6c6d6e',
    '--color-button-hover': '#969696',
    '--color-white': '#1E2029',
    '--navbar-hover': '#242630',
    '--color-hard-grey': '#333',
    '--color-grey': '#848F9F',
    '--color-low-grey': '#ddd',
    '--color-body': '#17171F',
    '--box-shadow-color': 'rgba(255, 255, 255, 0.182)',
    '--white-filter':
      'invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(100%)',
    '--dark-filter':
      'invert(100%) sepia(100%) saturate(0%) hue-rotate(127deg) brightness(103%) contrast(103%)',
    '--modal-background': 'rgb(50 50 50 / 50%)'
  }

  // Declare functions

  const handleChangeColors = () => {
    const root = document.documentElement

    if (theme === 'light') {
      setTheme('dark')
      Object.keys(darkTheme).forEach((key) => {
        root.style.setProperty(key, darkTheme[key])
      })
    } else {
      setTheme('light')
      Object.keys(lightTheme).forEach((key) => {
        root.style.setProperty(key, lightTheme[key])
      })
    }
  }

  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value
    if (selectedLanguage === activeLanguage) return
    const urlWithoutLanguage = window.location.pathname
      .split('/')
      .slice(2)
      .join('/')
    router.push(selectedLanguage + '/' + urlWithoutLanguage)
  }

  return (
    <div>
      <div className={styles.switchButton}>
        <input
          onChange={handleChangeColors}
          type='checkbox'
          name='switch-button'
          id='switch-label'
          className={styles.switchButtonCheckbox}
        />
        <label htmlFor='switch-label' className={styles.switchButtonLabel} />
      </div>
      <span>{dict.header.language}:</span>
      <select onChange={(e) => handleChangeLanguage(e)} value={activeLanguage}>
        {availableLanguages.map((language, index) => {
          return (
            <option key={index} value={language}>
              {language}
            </option>
          )
        })}
      </select>
    </div>
  )
}
