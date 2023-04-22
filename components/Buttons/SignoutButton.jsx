'use client'

import Image from "next/image";
import { signOut } from 'next-auth/react';

//Icons
import powerLogo from "../../public/icons/navbar/power.svg"

export function SignoutButton() {
    const handleSignOut = async () => {
        await signOut({
          callbackUrl: '/auth/login', // URL a la que se redirigirá al usuario después del cierre de sesión, como la página de inicio
          redirect: true,
        });
      };

    return (
        <a href="#" onClick={e =>  handleSignOut()}>
            <Image src={powerLogo} alt="logOut" width={25} height={25}></Image>
            <span>
                Tanca sessió
            </span>
        </a>
    )
}