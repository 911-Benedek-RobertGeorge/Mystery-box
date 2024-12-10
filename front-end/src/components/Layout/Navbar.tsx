import React, { useState } from 'react'
import {
    BaseWalletConnectButton,
    WalletConnectButton,
    WalletModalButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import { cn } from '../../libs/utils'
import { HoveredLink, Menu, MenuItem, ProductItem } from '../ui/NavbarMenu'
import logo from '../../assets/elements/logo.png'
import { useWallet } from '@solana/wallet-adapter-react'

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null)
    const { connected } = useWallet()

    return (
        <div
            className={cn(
                'absolute flex top-10 inset-x-0 md:p-10  md:px-24 justify-between z-[101] font-semibold text-lg',
                className
            )}
        >
            <img
                className=" flex justify-center items-ceter w-24 h-24 hover:scale-110 transition-transform duration-300 "
                src={logo}
            ></img>
            {connected && (
                <Menu setActive={setActive}>
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item="My Boxes"
                    >
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
                        </div>
                    </MenuItem>
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item="Pricing"
                    >
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="/hobby">Hobby</HoveredLink>
                            <HoveredLink href="/individual">
                                Individual
                            </HoveredLink>
                            <HoveredLink href="/team">Team</HoveredLink>
                            <HoveredLink href="/enterprise">
                                Enterprise
                            </HoveredLink>
                        </div>
                    </MenuItem>

                    <WalletMultiButton
                        style={{
                            backgroundColor: 'transparent',
                            color: '#0E7490',
                        }}
                    />
                </Menu>
            )}
            {!connected && (
                <WalletMultiButton
                    style={{
                        backgroundColor: '#0E7490',

                        borderRadius: '0.5rem',

                        boxShadow:
                            '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',

                        color: '#121717',
                    }}
                />
            )}
        </div>
    )
}

export default Navbar
