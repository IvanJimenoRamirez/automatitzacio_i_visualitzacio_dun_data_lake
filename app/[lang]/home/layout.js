import Link from 'next/link'
import Image from 'next/image'
import styles from './CommonHome.module.css'

// Components
import { AuthProvider } from '../../../components/Home/AuthProvider'
import { LanguageSelector } from '../../../components/Header/LanguageSelector'
import { UserName } from '../../../components/Header/UserName'
import { Navbar } from '../../../components/Navbar/Navbar'

// Logos
import upcLogo from '../../../public/images/upcLogo.png'

// Dictionary
import { getDictionary } from '../dictionaries'

export default async function RootLayout ({ params: { lang }, children }) {
  const dict = await getDictionary(lang)
  return (
    <body className={styles.body}>
      <header className={styles.header}>
        <AuthProvider>
          <UserName dict={dict} />
        </AuthProvider>
        <LanguageSelector dict={dict} />
      </header>
      <AuthProvider>
        <Navbar dict={dict} lang={lang} />
      </AuthProvider>
      <main className={styles.main}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </main>
      <footer className={styles.footer}>
        <Image src={upcLogo} width={260} height={80} alt='Universitat Politècnica de Catalunya. Barcelona Tech' priority />
        <Link href={`${lang}/home/privacyPolicy`}>
          <span>{dict.footer.privacyPolicy}</span>
        </Link>
      </footer>
    </body>
  )
}
