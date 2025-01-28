import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

interface FAQItemProps {
    question: string
    answer: string
    isOpen: boolean
    onToggle: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({
    question,
    answer,
    isOpen,
    onToggle,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background-light bg-opacity-75 rounded-lg border border-accent/20 mt-10"
        >
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
            >
                <h3 className="text-lg font-bold text-accent">{question}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FiChevronDown className="w-6 h-6 text-accent" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-4 text-gray-300 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: 'What is a memebox? 📦',
            answer: 'A mystery box containing Solana memecoins. Each box offers a chance to discover trending and potential moonshot tokens!',
        },
        {
            question: 'How do I buy a memebox? 💎',
            answer: 'Connect your Solana wallet, select your favorite box, and click "Buy now". You will be be asked to sign the buy transaction on your wallet. The transaction will be processed on-chain, and your box will be then ready to be revealed!',
        },
        {
            question: 'Are the boxes guaranteed profit? 📈',
            answer: 'No financial advice here. While we carefully curate each box with trending memecoins, crypto markets are highly volatile.',
        },
        {
            question: 'What happens after purchase? 🎁',
            answer: 'Your box contents are ready to be claimed. You can check your boxes in the "My Boxes" section and claim them by clicking the "Open" button.',
        },
        {
            question: 'Can I sell my box contents? 💰',
            answer: "Of course! Once the tokens are in your wallet, they're yours to HODL or trade. You can use any Solana DEX to swap your memecoins!",
        },
    ]

    return (
        <div className="flex flex-col w-screen max-w-screen select-none bg-background-dark overflow-hidden">
            <div className="relative p-4 md:p-8 mx-auto justify-center flex rounded-3xl flex-row h-full w-screen">
                <div className="bg-background-dark w-full h-full rounded-3xl shadow-inner shadow-cyan-600">
                    <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-accent/80 to-black opacity-10 animate-gradient-x"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black to-background-dark opacity-40"></div>
                    </div>

                    <div className="relative z-[50] flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-8">
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-emerald-500"
                        >
                            Frequently Asked Questions
                        </motion.p>

                        <div className="w-full max-w-3xl space-y-4">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onToggle={() =>
                                        setOpenIndex(
                                            openIndex === index ? null : index
                                        )
                                    }
                                />
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-8 text-center space-y-4"
                        >
                            <h3 className="text-2xl font-bold text-pink-500">
                                Still have questions? 🤝
                            </h3>
                            <p className="text-gray-400">
                                Reach out to us on{' '}
                                <a
                                    href="https://t.me/giurgiur99"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent-light transition-colors"
                                >
                                    Telegram
                                </a>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ
