import { useState } from 'react'
 import { cn, scrollToSection } from '../../libs/utils'
import logo from '../../assets/boxes/logo.png'
import { Link } from 'react-router-dom'
 import { useAppKitAccount } from '@reown/appkit/react'
import { ADMIN_WALLETS } from '../../libs/constants'
 
function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null)
     const { address : publicKey, isConnected } = useAppKitAccount()
  
     const isAdmin = publicKey && ADMIN_WALLETS.includes(publicKey )
 
    return (
        <div
            className={cn(
                'select-none absolute flex top-10 mr-2 inset-x-0 p-6 md:p-10  md:px-24 justify-between z-[101] font-semibold text-lg',
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
                className={cn(`transform-all duration-500 transition ease-in-out h-10 items-center relative rounded-full border border-transparent border-r-accent border-l-accent bg-muted shadow-input flex justify-center space-x-8 shadow-inner shadow-accent-dark scale-75 md:scale-100 `,   isConnected ? "h-16 px-4" : " " )}
            >
                {' '}
                {!isConnected ? (
                    <>
                    
                    </>
                ) : (
                    <>
                        <div className="md:hidden  ">
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
                                <div className="absolute flex flex-col items-center justify-center rounded-3xl p-2 top-16 -left-16 w-[10rem] bg-muted shadow-lg">
                                    <button
                                        className="block px-4 py-2  text-accent-dark hover:text-accent"
                                        onClick={() => {
                                            setActive(null)
                                            scrollToSection('my-boxes')
                                        }}
                                    >
                                        My Boxes
                                    </button>
                                   
                                    {isAdmin  && (
                                        <Link
                                            to="/analytics"
                                            className="block px-4 py-2 text-accent-dark hover:text-accent"
                                            onClick={() => setActive(null)}
                                        >
                                            Analytics
                                        </Link>
                                    )}               
                                     <appkit-button/>

                                </div>
                            )}
                        </div>
                        <div className="hidden md:flex space-x-8 justify-center items-center">
                            {isAdmin  && (
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
                      
                        </div>
                    </>
                )} 
               <div className={cn('md:flex ', publicKey ? "hidden" : "")} >  <appkit-button /></div>
            </div>
        </div>
    )
}

export default Navbar
