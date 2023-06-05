import Link from "next/link";
import Image from "next/image";
import styles from "./CommonHome.module.css";

// Components
import { NavbarButton } from "../../../components/Buttons/NavbarButton";
import { SignoutButton } from "../../../components/Buttons/SignoutButton";
import { AuthProvider } from "../../../components/Home/AuthProvider"
import { NavbarAdmin } from "../../../components/Admin/NavbarAdmin";
import { LanguageSelector } from "../../../components/Header/LanguageSelector";
import { UserName } from "../../../components/Header/UserName";

// Icons
import homeLogo from "../../../public/icons/navbar/home.svg";
import userLogo from "../../../public/icons/navbar/user.svg";
import temporalLandingZoneLogo from "../../../public/icons/navbar/temporalLandingZone.svg";
import landingZoneLogo from "../../../public/icons/navbar/landingZone.svg"
import formattedZoneLogo from "../../../public/icons/navbar/formattedZone.svg"
import projectsLogo from "../../../public/icons/navbar/projects.svg"

// Logos
import upcLogo from "../../../public/images/upcLogo.png";

// Dictionary
import { getDictionary } from '../dictionaries';

export default async function RootLayout({ params: { lang }, children }) {
    const dict = await getDictionary(lang);
  return (
      <body className={styles.body}>
            <header className={styles.header}>
                <AuthProvider>
                    <UserName dict={dict}/>
                </AuthProvider>
                <LanguageSelector dict={dict} />
            </header>
            <nav id="navbar" className={styles.nav}>
                <div>
                    <NavbarButton navbarId={"navbar"} className={styles.active} />
                </div>
                <div className={styles.marginTop}>
                    <Link href={`${lang}/home`} >
                        <Image src={homeLogo} alt={dict.navbar.home} width={25} height={25}></Image>
                        <span>
                            {dict.navbar.home}
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href={`${lang}/home/temporalLandingZone`} >
                        <Image src={temporalLandingZoneLogo} alt="TLZ" width={25} height={25}></Image>
                        <span>
                            {dict.navbar.tlz}
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href={`${lang}/home/landingZone`}>
                        <Image src={landingZoneLogo} alt="LZ" width={25} height={25}></Image>
                        <span>
                            {dict.navbar.lz}
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href={`${lang}/home/formattedZone`}>
                        <Image src={formattedZoneLogo} alt="FZ" width={25} height={25}></Image>
                        <span>
                            {dict.navbar.fz}
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href={`${lang}/home/projects`}>
                        <Image src={projectsLogo} alt={dict.navbar.projects} width={25} height={25}></Image>
                        <span>
                            {dict.navbar.projects}
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href={`${lang}/home/profile`} >
                        <Image src={userLogo} alt={dict.navbar.profile} width={25} height={25}></Image>
                        <span>
                            {dict.navbar.profile}
                        </span>
                    </Link>
                </div>

                <AuthProvider>
                    <NavbarAdmin adminTranslation={dict.navbar.admin} lang={lang} /> 
                </AuthProvider>

                <div>
                    <SignoutButton signoutTranslation={dict.navbar.logout} lang={lang} />
                </div>
            </nav>
            <main className={styles.main}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </main>
            <footer className={styles.footer}>
                <Image src={upcLogo} width={260} height={80} alt={"Universitat Politècnica de Catalunya. Barcelona Tech"} priority></Image>
                <Link href={`${lang}/home/privacyPolicy`}>
                    <span><u>{dict.footer.privacyPolicy}</u></span>
                </Link>
            </footer>
        </body>
  );
}
