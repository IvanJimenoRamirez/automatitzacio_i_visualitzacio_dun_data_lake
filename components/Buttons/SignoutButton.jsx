'use client'

import Image from "next/image";
import { signOut } from 'next-auth/react';

//Icons
import powerLogo from "../../public/icons/navbar/power.svg"

export function SignoutButton( { signoutTranslation, lang }) {
    const handleSignOut = async () => {
        await signOut({
          callbackUrl: `/${lang}/auth/login`, // URL a la que se redirigirá al usuario después del cierre de sesión, como la página de inicio
          redirect: true,
        });
      };

    return (
        <a href="#" onClick={e =>  handleSignOut()}>
            <Image src={powerLogo} alt={signoutTranslation} width={25} height={25}></Image>
            <span>
                {signoutTranslation}
            </span>
        </a>
    )
}