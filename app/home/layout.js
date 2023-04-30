import Link from "next/link";
import Image from "next/image";
import styles from "./CommonHome.module.css";

// Components
import { NavbarButton } from "../../components/Buttons/NavbarButton";
import { SignoutButton } from "../../components/Buttons/SignoutButton";

// Icons
import homeLogo from "../../public/icons/navbar/home.svg";
import userLogo from "../../public/icons/navbar/user.svg";
import temporalLandingZoneLogo from "../../public/icons/navbar/temporalLandingZone.svg";
import landingZoneLogo from "../../public/icons/navbar/landingZone.svg"
import formattedZoneLogo from "../../public/icons/navbar/formattedZone.svg"
import projectsLogo from "../../public/icons/navbar/projects.svg"

// Logos
import upcLogo from "../../public/images/upcLogo.png";


export default function RootLayout({ children }) {
  return (
    <body className={styles.body}>
            <header className={styles.header}>
                <Image src={upcLogo} width={260} height={80} alt={"Universitat Politècnica de Catalunya. Barcelona Tech"} priority></Image>
            </header>
            <nav id="navbar" className={styles.nav}>
                <div>
                    <NavbarButton navbarId={"navbar"} className={styles.active} />
                </div>
                <div className={styles.marginTop}>
                    <Link href="/home" >
                        <Image src={homeLogo} alt="home" width={25} height={25}></Image>
                        <span>
                            Inici
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href="home/temporalLandingZone" >
                        <Image src={temporalLandingZoneLogo} alt="TLZ" width={25} height={25}></Image>
                        <span>
                            Temporal Landing Zone
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href="home/landingZone" >
                        <Image src={landingZoneLogo} alt="LZ" width={25} height={25}></Image>
                        <span>
                            Landing Zone
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href="home/formattedZone" >
                        <Image src={formattedZoneLogo} alt="FZ" width={25} height={25}></Image>
                        <span>
                            Formatted Zone
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href="home/projects" >
                        <Image src={projectsLogo} alt="Projects" width={25} height={25}></Image>
                        <span>
                            Projects
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href="auth/login" >
                        <Image src={userLogo} alt="UserImage" width={25} height={25}></Image>
                        <span>
                            Account
                        </span>
                    </Link>
                </div>
                <div>
                    <SignoutButton />
                </div>
            </nav>
            <main className={styles.main}>
                {children}
            </main>
        </body>
  );
}
