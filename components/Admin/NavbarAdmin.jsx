'use client'

// Imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Icons
import lockIcon from '../../public/icons/navbar/lock.svg';


export function NavbarAdmin () {
  const { data: session, status } = useSession();

  return (
    <>
      {
        status === 'authenticated' && session.user.role === 1 ?
        <div>
            <Link href="home/admin" >
                <Image src={lockIcon} alt="UserImage" width={25} height={25}></Image>
                <span>
                    Admin
                </span>
            </Link>
        </div>
        :
        <></>
      }
    </>
  );
};
