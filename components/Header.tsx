import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PlusCircleIcon, SearchIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atom/modalAtom';

interface Props {}

const Header: React.FC<Props> = () => {
  const { data: session } = useSession();
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalState);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3">
        <Link href="/">
          <div className="relative hidden h-24 w-24 cursor-pointer lg:inline-flex">
            <Image
              src="/instagram.png"
              alt="instagram"
              layout="fill"
              className="object-contain"
            />
          </div>
        </Link>
        <Link href="/">
          <div className="relative h-10 w-10 cursor-pointer lg:hidden">
            <Image
              src="/instagram-logo.webp"
              alt="instagram"
              layout="fill"
              className="object-contain"
            />
          </div>
        </Link>

        <div className="relative">
          <div className="absolute top-2.5 left-2">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="rounded-md border-gray-500 bg-gray-50 pl-10 text-sm focus:border-black focus:ring-black"
          />
        </div>

        <div className="flex items-center space-x-4">
          <HomeIcon className="hidden h-6 w-6 cursor-pointer transition-transform duration-200 ease-out hover:scale-125 md:inline-flex" />
          {session ? (
            <>
              <PlusCircleIcon
                onClick={() => setModalIsOpen(true)}
                className="h-6 w-6 cursor-pointer transition-transform duration-200 ease-out hover:scale-125"
              />
              <img
                src={session.user?.image ? session.user.image : '/vercel.svg'}
                alt="user"
                className="h-10 w-10 cursor-pointer rounded-full"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
