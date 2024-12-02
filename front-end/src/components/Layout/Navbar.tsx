import React, { useState } from 'react'
import {
    WalletConnectButton,
    WalletModalButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import { cn } from '../../libs/utils'
import { HoveredLink, Menu, MenuItem, ProductItem } from '../ui/NavbarMenu'
import logo from '../../assets/elements/logo.png'

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null)
    return (
        <div
            className={cn(
                'fixed flex top-10 inset-x-0 md:p-10 md:px-24 mx-auto justify-between z-[101]',
                className
            )}
        >
            <img
                className=" flex justify-center items-ceter w-24 h-24 hover:scale-110 transition-transform duration-300 "
                src={logo}
            ></img>
            <Menu setActive={setActive}>
                {/* <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">
                            Web Development
                        </HoveredLink>
                        <HoveredLink href="/interface-design">
                            Interface Design
                        </HoveredLink>
                        <HoveredLink href="/seo">
                            Search Engine Optimization
                        </HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem> */}
                <MenuItem setActive={setActive} active={active} item="Boxes">
                    <div className="text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Algochurn"
                            href="https://algochurn.com"
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Tailwind Master Kit"
                            href="https://tailwindmasterkit.com"
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            description="Production ready Tailwind css components for your next project"
                        />
                        {/* <ProductItem
                            title="Moonbeam"
                            href="https://gomoonbeam.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="Rogue"
                            href="https://userogue.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                        /> */}
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Pricing">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/hobby">Hobby</HoveredLink>
                        <HoveredLink href="/individual">Individual</HoveredLink>
                        <HoveredLink href="/team">Team</HoveredLink>
                        <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                    </div>
                </MenuItem>
                <WalletModalButton className="" />
                <WalletMultiButton className="" />
            </Menu>
        </div>
    )
}

export default Navbar
