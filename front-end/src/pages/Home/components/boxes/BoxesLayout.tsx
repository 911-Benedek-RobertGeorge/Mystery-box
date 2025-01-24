import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Modal } from '../../../../components/ui/AnimatedModal'

interface BoxesLayoutProps {
    children: React.ReactNode
    isChevronHidden: boolean
}

export const BoxesLayout: React.FC<BoxesLayoutProps> = ({
    children,
    isChevronHidden,
}) => {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [direction, setDirection] = useState(0)
    const childrenArray = React.Children.toArray(children)
    const handleNext = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % childrenArray.length)
    }

    const handlePrevious = () => {
        setDirection(-1)
        setCurrentIndex((prev) =>
            prev === 0 ? childrenArray.length - 1 : prev - 1
        )
    }

    const handleDragEnd = (
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        if (info.offset.x > 100) {
            handlePrevious()
        } else if (info.offset.x < -100) {
            handleNext()
        }
    }

    const handleDotClick = (index: number) => {
        if (index === currentIndex) return
        const newDirection = index > currentIndex ? 1 : -1
        setDirection(newDirection)
        setCurrentIndex(index)
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                handlePrevious()
            } else if (event.key === 'ArrowRight') {
                handleNext()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0,
        }),
    }

    return (
        <div className="relative w-full lg:pb-32">
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-accent/80 to-black opacity-10 animate-gradient-x"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black to-background-dark opacity-40"></div>
                <div className="absolute top-56 left-52 inset-0 bg-[url('src/assets/shapes/lines.png')] opacity-5"></div>
            </div>

            <div className="relative flex items-center justify-center min-h-[800px]">
                <button
                    hidden={isChevronHidden}
                    onClick={handlePrevious}
                    className="absolute left-4 md:left-16 lg:left-80 z-[102] p-4 text-accent hover:text-accent-light transition-colors bg-black/30 rounded-full backdrop-blur-sm hover:bg-black/50"
                >
                    <FaChevronLeft size={24} />
                </button>

                <div className="flex justify-center items-center w-full">
                    <AnimatePresence
                        initial={false}
                        mode="wait"
                        custom={direction}
                    >
                        <Modal>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={handleDragEnd}
                                transition={{
                                    duration: 0.2,
                                    ease: 'easeInOut',
                                }}
                                className="flex justify-center items-center touch-pan-y"
                            >
                                {childrenArray[currentIndex]}
                            </motion.div>
                        </Modal>
                    </AnimatePresence>
                </div>

                <button
                    hidden={isChevronHidden}
                    onClick={handleNext}
                    className="absolute right-4 md:right-16 lg:right-80 z-[102] p-4 text-accent hover:text-accent-light transition-colors bg-black/30 rounded-full backdrop-blur-sm hover:bg-black/50"
                >
                    <FaChevronRight size={24} />
                </button>
            </div>

            <div className="flex justify-center space-x-3 mt-8">
                {childrenArray.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-200 ${
                            currentIndex === index
                                ? 'bg-accent scale-110 ring-2 ring-accent/30 ring-offset-2 ring-offset-background-dark'
                                : 'bg-accent/30 hover:bg-accent/50 hover:scale-105'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
