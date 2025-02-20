'use client'
import { AnimatePresence, motion } from 'framer-motion'
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { cn } from '../../libs/utils'

interface ModalContextType {
    open: boolean
    setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false)

    return (
        <ModalContext.Provider value={{ open, setOpen }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

export function Modal({ children }: { children: ReactNode }) {
    return <ModalProvider>{children}</ModalProvider>
}

export const ModalTrigger = ({
    children,
    className,
    setIsChevronHidden,
}: {
    children: ReactNode
    className?: string
    setIsChevronHidden?: (value: boolean) => void
}) => {
    const { setOpen } = useModal()
    return (
        <button
            className={cn(
                'px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden ',
                className
            )}
            onClick={() => {
                setOpen(true)
                setIsChevronHidden && setIsChevronHidden(true)
            }}
        >
            {children}
        </button>
    )
}

export const ModalBody = ({
    children,
    className,
    closeModal,
    setIsChevronHidden,
}: {
    children: ReactNode
    className?: string
    closeModal?: boolean
    setIsChevronHidden?: (value: boolean) => void
}) => {
    const { open } = useModal()
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [open])

    const modalRef = useRef(null)
    const { setOpen } = useModal()
    if (closeModal) {
        setOpen(false)
        setIsChevronHidden && setIsChevronHidden(false)
    }

    // useOutsideClick(modalRef, () => setOpen(false))

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        backdropFilter: 'blur(10px)',
                    }}
                    exit={{
                        opacity: 0,
                        backdropFilter: 'blur(0px)',
                    }}
                    className="p-4 fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-[200]"
                >
                    <Overlay />

                    <motion.div
                        ref={modalRef}
                        className={cn(
                            'z-[200] min-h-[50%] max-h-[94%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative flex flex-col flex-1 overflow-hidden',
                            className
                        )}
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                            rotateX: 40,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotateX: 0,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            rotateX: 10,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 15,
                        }}
                    >
                        <CloseIcon setIsChevronHidden={setIsChevronHidden} />
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export const ModalContent = ({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) => {
    return (
        <div className={cn('flex flex-col flex-1 p-4 md:p-8', className)}>
            {children}
        </div>
    )
}

export const ModalFooter = ({
    children,
    className,
    shouldClose,
}: {
    children: ReactNode
    className?: string
    shouldClose?: boolean
}) => {
    const { setOpen } = useModal()

    return (
        <div
            onClick={() => shouldClose && setOpen(false)}
            className={cn('flex justify-end p-4 bg-neutral-900', className)}
        >
            {children}
        </div>
    )
}

const Overlay = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                backdropFilter: 'blur(10px)',
            }}
            exit={{
                opacity: 0,
                backdropFilter: 'blur(0px)',
            }}
            className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 z-[200] ${className}`}
        ></motion.div>
    )
}

const CloseIcon = ({
    setIsChevronHidden,
}: {
    setIsChevronHidden?: (value: boolean) => void
}) => {
    const { setOpen } = useModal()
    return (
        <button
            onClick={() => {
                setOpen(false)
                setIsChevronHidden && setIsChevronHidden(false)
            }}
            className="absolute top-4 right-4 group"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent   h-6 w-6 group-hover:scale-125 group-hover:rotate-90 transition duration-200"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
            </svg>
        </button>
    )
}

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
// export const useOutsideClick = (
//     ref: React.RefObject<HTMLDivElement>,
//     callback: Function
// ) => {
//     useEffect(() => {
//         const listener = (event: any) => {
//             // DO NOTHING if the element being clicked is the target element or their children
//             if (!ref.current || ref.current.contains(event.target)) {
//                 return
//             }
//             callback(event)
//         }

//         document.addEventListener('mousedown', listener)
//         document.addEventListener('touchstart', listener)

//         return () => {
//             document.removeEventListener('mousedown', listener)
//             document.removeEventListener('touchstart', listener)
//         }
//     }, [ref, callback])
// }
