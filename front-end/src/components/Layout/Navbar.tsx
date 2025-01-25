import { useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { cn, scrollToSection, shortenAddress } from '../../libs/utils'
import logo from '../../assets/boxes/logo.png'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppKitAccount } from '@reown/appkit/react'
import { ADMIN_WALLETS } from '../../libs/constants'
import { useWallet } from '@solana/wallet-adapter-react'

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null)
    // const { connected, publicKey, disconnect } = useWallet()
    const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
        useAppKitAccount()
    // const publicKey = new publicKey(address)
    // const onDisconnect = () => {
    //     sessionStorage.removeItem('jwtToken')
    //     disconnect()
    // }

 
    const { connected, publicKey, disconnect } = useWallet()
    const isAdmin = publicKey && ADMIN_WALLETS.includes(publicKey.toString())

    const onDisconnect = () => {
        sessionStorage.removeItem('jwtToken')
        disconnect()
    }

    return (
        <div
            className={cn(
                'select-none absolute flex top-10 inset-x-0 p-6 md:p-10  md:px-24 justify-between z-[101] font-semibold text-lg',
                className
            )}
        >
            <Link to="/">
                <img
                    className=" flex justify-center items-center w-24 h-24 hover:scale-110 transition-transform duration-300 "
                    src={logo}
                ></img>
            </Link>
            <div
                className={`transform-all duration-500 transition ease-in-out h-16 items-center relative rounded-full border border-r-accent border-l-accent border-transparent bg-muted shadow-input flex justify-center space-x-8 px-8 shadow-inner shadow-accent-dark scale-75 md:scale-100 `}
            >
                {' '}
                {!isConnected ? (
                    <>
                        {' '}
                        {/* <WalletMultiButton
                            style={{
                                padding: '0',
                                backgroundColor: 'transparent',
                                color: isConnected ? '#0E7490' : '#24B9C0',
                            }}
                        /> */}
                    </>
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
                                    <button
                                        className="block px-4 py-2  text-accent-dark hover:text-accent"
                                        onClick={() => {
                                            setActive(null)
                                            scrollToSection('my-boxes')
                                        }}
                                    >
                                        My Boxes
                                    </button>
                                    {/* <Link
                                        to="./#"
                                        className="block px-4 py-2  text-accent-dark hover:text-accent"
                                        onClick={() => setActive(null)}
                                    >
                                        How to buy
                                    </Link> */}
                                    <div className="text-accent-dark hover:text-accent">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    address ?? ''
                                                )
                                                toast.success(
                                                    'Address copied to clipboard'
                                                )
                                            }}
                                            className="text-accent-dark hover:text-accent"
                                        >
                                            {shortenAddress(address ?? '', 3)}
                                        </button>
                                    </div>{' '}
                                    {/* <WalletDisconnectButton
                                        // onClick={onDisconnect}
                                        style={{
                                            padding: '0',
                                            backgroundColor: 'transparent',
                                            color: connected
                                                ? '#0E7490'
                                                : '#24B9C0',
                                        }}
                                    /> */}
                                    {isAdmin && connected && (
                                        <Link
                                            to="/analytics"
                                            className="block px-4 py-2 text-accent-dark hover:text-accent"
                                            onClick={() => setActive(null)}
                                        >
                                            Analytics
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="hidden md:flex space-x-8 justify-center items-center">
                            {isAdmin && connected && (
                                <Link
                                    to="/analytics"
                                    className="text-accent-dark hover:text-accent transition-colors"
                                >
                                    Analytics
                                </Link>
                            )}
                            <button
                                className="text-accent-dark hover:text-accent"
                                onClick={() => {
                                    setActive(null)
                                    scrollToSection('my-boxes')
                                }}
                            >
                                My Boxes
                            </button>
                            <div className="text-accent-dark hover:text-accent">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            address ?? ''
                                        )
                                        toast.success(
                                            'Address copied to clipboard'
                                        )
                                    }}
                                    className="text-accent-dark hover:text-accent"
                                >
                                    {shortenAddress(address ?? '', 3)}
                                </button>
                            </div>
                            {/* <WalletDisconnectButton
                                onClick={onDisconnect}
                                style={{
                                    padding: '0',
                                    backgroundColor: 'transparent',
                                    color: connected ? '#0E7490' : '#24B9C0',
                                }}
                            /> */}
                        </div>
                    </>
                )}{' '}
                <appkit-button/>
            </div>
        </div>
    )
}

export default Navbar
