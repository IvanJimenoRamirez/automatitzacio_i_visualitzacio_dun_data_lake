/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { NavbarButton } from '../Buttons/NavbarButton'
import { SignoutButton } from '../Buttons/SignoutButton'

// Styles
import styles from './Navbar.module.css'

// Icons
import homeLogo from '../../public/icons/navbar/home.svg'
import userLogo from '../../public/icons/navbar/user.svg'
import temporalLandingZoneLogo from '../../public/icons/navbar/temporalLandingZone.svg'
import landingZoneLogo from '../../public/icons/navbar/landingZone.svg'
import formattedZoneLogo from '../../public/icons/navbar/formattedZone.svg'
import projectsLogo from '../../public/icons/navbar/projects.svg'
import lockIcon from '../../public/icons/navbar/lock.svg'

export function Navbar ({ dict, lang }) {
  const { data: session, status } = useSession()

  const [active, setActive] = useState(null)

  const handleClick = (id) => {
    if (active !== null) {
      document.querySelector(`#${active}`).classList.toggle(styles.selected)
    }
    setActive(id)
    document.querySelector(`#${id}`).classList.toggle(styles.selected)
  }

  return (
    <nav id='navbar' className={styles.nav}>
      <div>
        <NavbarButton navbarId='navbar' className={styles.active} />
      </div>
      <div className={styles.marginTop} onClick={e => handleClick('home')}>
        <Link id='home' href={`/${lang}/home`}>
          <Image src={homeLogo} alt={dict.navbar.home} width={25} height={25} />
          <span>
            {dict.navbar.home}
          </span>
        </Link>
      </div>
      <div onClick={e => handleClick('tlz')}>
        <Link id='tlz' href={`/${lang}/home/temporalLandingZone`}>
          <Image src={temporalLandingZoneLogo} alt='TLZ' width={25} height={25} />
          <span>
            {dict.navbar.tlz}
          </span>
        </Link>
      </div>
      <div onClick={e => handleClick('lz')}>
        <Link id='lz' href={`/${lang}/home/landingZone`}>
          <Image src={landingZoneLogo} alt='LZ' width={25} height={25} />
          <span>
            {dict.navbar.lz}
          </span>
        </Link>
      </div>
      <div onClick={e => handleClick('fz')}>
        <Link id='fz' href={`/${lang}/home/formattedZone`}>
          <Image src={formattedZoneLogo} alt='FZ' width={25} height={25} />
          <span>
            {dict.navbar.fz}
          </span>
        </Link>
      </div>
      <div onClick={e => handleClick('proj')}>
        <Link id='proj' href={`/${lang}/home/projects`}>
          <Image src={projectsLogo} alt={dict.navbar.projects} width={25} height={25} />
          <span>
            {dict.navbar.projects}
          </span>
        </Link>
      </div>
      <div onClick={e => handleClick('prof')}>
        <Link id='prof' href={`/${lang}/home/profile`}>
          <Image src={userLogo} alt={dict.navbar.profile} width={25} height={25} />
          <span>
            {dict.navbar.profile}
          </span>
        </Link>
      </div>

        {
        status === 'authenticated' && session.user.role === 1
          ? <div onClick={e => handleClick('admin')}>
              <Link id='admin' href={`${lang}/home/admin`}>
              <Image src={lockIcon} alt={dict.navbar.admin} width={25} height={25} />
              <span>
                {dict.navbar.admin}
              </span>
            </Link>
            </div>
          : <></>
      }

      <div>
        <SignoutButton signoutTranslation={dict.navbar.logout} lang={lang} />
      </div>
    </nav>
  )
}
