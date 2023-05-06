'use client'

// Imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Icons
import lockIcon from '../../public/icons/navbar/lock.svg';


export function NavbarAdmin ( { adminTranslation, lang }) {
  const { data: session, status } = useSession();

  return (
    <>
      {
        status === 'authenticated' && session.user.role === 1 ?
        <div>
            <Link href={`${lang}/home/admin`} >
                <Image src={lockIcon} alt={adminTranslation} width={25} height={25}></Image>
                <span>
                    {adminTranslation}
                </span>
            </Link>
        </div>
        :
        <></>
      }
    </>
  );
};
