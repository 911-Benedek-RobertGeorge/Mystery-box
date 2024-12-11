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
import { Link } from 'react-router-dom'

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null)
    const { connected } = useWallet()

    return (
        <div
            className={cn(
                'select-none absolute flex top-10 inset-x-0 p-6 md:p-10  md:px-24 justify-between z-[101] font-semibold text-lg',
                className
            )}
        >
            <img
                className=" flex justify-center items-center w-24 h-24 hover:scale-110 transition-transform duration-300 "
                src={logo}
            ></img>

            <div
                className={`transform-all duration-500 transition ease-in-out h-16 items-center relative rounded-full border border-r-accent border-l-accent border-transparent bg-muted shadow-input flex justify-center space-x-8 px-8 shadow-inner shadow-accent-dark scale-75 md:scale-100 `}
            >
                {!connected ? (
                    <WalletMultiButton
                        style={{
                            padding: '0',
                            backgroundColor: 'transparent',
                            color: connected ? '#0E7490' : '#24B9C0',
                        }}
                    />
                ) : (
                    <>
                        <div className="md:hidden ">
                            <button
                                className=" text-accent focus:outline-none"
                                onClick={() =>
                                    setActive(active === 'menu' ? null : 'menu')
                                }
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    ></path>
                                </svg>
                            </button>
                            {active === 'menu' && (
                                <div className="absolute flex flex-col items-center justify-center rounded-3xl p-2 top-16 -left-12 w-[10rem] bg-muted shadow-lg">
                                    <Link
                                        to="/my-boxes"
                                        className="block px-4 py-2 text-accent-dark hover:text-accent"
                                        onClick={() => setActive(null)}
                                    >
                                        My Boxes
                                    </Link>
                                    <Link
                                        to="./#"
                                        className="block px-4 py-2 text-accent-dark hover:text-accent"
                                        onClick={() => setActive(null)}
                                    >
                                        How to buy
                                    </Link>

                                    <WalletMultiButton
                                        style={{
                                            padding: '0',
                                            backgroundColor: 'transparent',
                                            color: connected
                                                ? '#0E7490'
                                                : '#24B9C0',
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="hidden md:flex space-x-8 justify-center items-center">
                            <Link
                                to="/my-boxes"
                                className="text-accent-dark hover:text-accent"
                            >
                                My Boxes
                            </Link>
                            <Link
                                to="./#"
                                className="text-accent-dark hover:text-accent"
                            >
                                How to buy
                            </Link>
                            <WalletMultiButton
                                style={{
                                    padding: '0',
                                    backgroundColor: 'transparent',
                                    color: connected ? '#0E7490' : '#24B9C0',
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
            {/* // <Menu setActive={setActive}>
                //     <MenuItem
                //         setActive={setActive}
                //         active={active}
                //         item="My Boxes"
                //     >
                //         <div className="text-sm grid grid-cols-2 gap-10 p-4">
                //             <ProductItem
                //                 title="Algochurn"
                //                 href="https://algochurn.com"
                //                 src="https://assets.aceternity.com/demos/algochurn.webp"
                //                 description="Prepare for tech interviews like never before."
                //             />
                //             <ProductItem
                //                 title="Tailwind Master Kit"
                //                 href="https://tailwindmasterkit.com"
                //                 src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                //                 description="Production ready Tailwind css components for your next project"
                //             />
                //         </div>
                //     </MenuItem>
                //     <MenuItem
                //         setActive={setActive}
                //         active={active}
                //         item="Pricing"
                //     >
                //         <div className="flex flex-col space-y-4 text-sm">
                //             <HoveredLink href="/hobby">Hobby</HoveredLink>
                //             <HoveredLink href="/individual">
                //                 Individual
                //             </HoveredLink>
                //             <HoveredLink href="/team">Team</HoveredLink>
                //             <HoveredLink href="/enterprise">
                //                 Enterprise
                //             </HoveredLink>
                //         </div>
                //     </MenuItem>

                //     <WalletMultiButton
                //         style={{
                //             backgroundColor: 'transparent',
                //             color: '#0E7490',
                //         }}
                //     />
                // </Menu> */}

            {/* {!connected && (
                <WalletMultiButton
                    style={{
                        backgroundColor: '#0E7490',

                        borderRadius: '0.5rem',

                        boxShadow:
                            '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',

                        color: '#121717',
                    }} 
                />
            )}*/}
        </div>
    )
}

export default Navbar
