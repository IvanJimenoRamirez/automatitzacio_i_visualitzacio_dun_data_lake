import Link from "next/link";
import Image from "next/image";
import styles from "./CommonHome.module.css";

// Components
import { NavbarButton } from "../../components/Buttons/NavbarButton";

// Icons
import homeLogo from "../../public/icons/navbar/home.svg";
import temporalLandingZone from "../../public/icons/navbar/temporalLandingZone.svg";
import userLogo from "../../public/icons/navbar/user.svg";

// Logos
import upcLogo from "../../public/images/upcLogo.png";


export default function RootLayout({ children }) {
  return (
    <body className={styles.body}>
            <header className={styles.header}>
                <Image src={upcLogo} width={260} height={80}></Image>
            </header>
            <nav id="navbar" className={styles.nav}>
                <div>
                    <NavbarButton navbarId={"navbar"} className={styles.active} />
                </div>
                <div className={styles.marginTop}>
                    <Link href="/home" >
                        <Image src={homeLogo} alt="UserImage" width={25} height={25}></Image>
                        <span>
                            Home
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href="home/temporalLandingZone" >
                        <Image src={temporalLandingZone} alt="TLZ" width={25} height={25}></Image>
                        <span>
                            Temporal Landing Zone
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
                    <Link href="auth/login" >
                        <Image src={userLogo} alt="UserImage" width={25} height={25}></Image>
                        <span>
                            Account
                        </span>
                    </Link>
                </div>
            </nav>
            <main className={styles.main}>
                {children}
            </main>
        </body>
  );
}
