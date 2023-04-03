import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.css";

import { NavbarButton } from "../components/Buttons/NavbarButton";
import userLogo from "../public/icons/user.svg";
import upcLogo from "../public/images/upcLogo.png";

export default function Home() {
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
                <h1>This is the main content</h1>
                <h3>· Subtitle</h3>
                <span>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, beatae modi eos mollitia corrupti neque deserunt architecto ipsa, maxime, molestias recusandae asperiores saepe. Unde nulla, officia eligendi voluptatibus provident doloribus.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem illum perferendis deserunt repellendus dolorum hic consequuntur suscipit, libero ut vitae molestiae nihil quo distinctio. Reprehenderit sit quas a modi ratione.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, a repudiandae dolor provident quam eaque consequatur doloribus architecto ea ullam velit esse. Et doloremque laborum atque, velit officiis error quam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero totam debitis nihil ex aspernatur labore nam, nostrum maiores, deserunt nemo est optio sunt facilis fuga modi saepe officiis, ipsum cupiditate?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore quae voluptatem earum, sed a incidunt corrupti provident reiciendis aperiam hic quos quam, voluptates facilis. Eos, cupiditate. Fuga iusto necessitatibus dolore!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis possimus sequi accusantium sunt in fugit, eum vero rem itaque labore minus nulla velit unde consequuntur enim inventore ipsa maiores expedita.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quaerat vel placeat reiciendis dolor ab eum officiis aliquid magni ut, ratione dolorum. Corrupti soluta repudiandae perferendis iure aperiam? Nobis, assumenda.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, similique. Suscipit hic delectus est ad facere incidunt, optio eius eveniet? Eveniet, corporis sunt mollitia autem perferendis doloremque dolorem ullam delectus?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate quasi atque repellat error esse ex, unde illo labore sapiente id adipisci fugiat aut maxime eligendi. Aspernatur eius cupiditate molestiae rem!
                </span>
            </main>
        </body>
    )
}