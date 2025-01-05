"use client";

import dynamic from 'next/dynamic'; 
import { useState } from 'react';
import { GradientText } from '@/components/gradient-text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Home', 
      href: '/'
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
    },
    {
        name: 'Docs',
        href: '/docs',
      },
  ];

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export default function NavBar() {
    const [dropdown, setDropdown] = useState<boolean>(false);

    return (
        <nav className = "w-full p-6 bg-black bg-opacity-50 backdrop-blur-md fixed top-0 left-0 right-0 position-sticky z-50 max-h-24 pt-6 text-white">
            <div className="justify-between mx-auto pr-6 lg:max-w-7x1 flex md:pr-8">
                {/*<h1 className = "hidden md:block font-semibold text-3xl pt-1.5">Swap Simulator</h1>*/}
                {/*<GradientText className="text-4xl font-bold pt-1.5">DevKit Launchpad</GradientText>*/}
                <h1  className="text-4xl font-bold text-cyan-400 pt-1.5">Devkit Launchpad</h1>
                <div className="gap-5 hidden md:flex center pt-2">
                    <PCNavLinks />
                </div>
                
                <div className="pt"><WalletMultiButtonDynamic style={{background:"#374151"}} /></div>
            </div>
        </nav>
      )
}

function PCNavLinks() {
    const pathname = usePathname();
    return (
      <>
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${pathname === link.href ? 'text-cyan-400 font-semibold text-2xl' : 'font-semibold text-2xl mx-4'}`}
            >
              <h2>{link.name}</h2>
            </Link>
          );
        })}
      </>
    );
}