import React from 'react'
import SectionContainer from '../Home/components/SectionContainer'

const TermsAndConditions: React.FC = () => {
    return (
        <div className="bg-background-dark  w-screen h-screen">
            <SectionContainer>
                <div className="text-accent-dark p-8 flex items-center justify-center flex-col max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mt-16  text-center">
                        Terms and Conditions
                    </h1>
                    <p className="mb-6 text-justify">
                        By using this website and purchasing our mystery boxes,
                        you agree to the following terms:
                    </p>

                    <ul className="list-disc pl-5 overflow-auto scrollbar h-[30rem]">
                        <li className="mb-6">
                            <h2 className="text-2xl font-semibold">
                                No Financial Advice
                            </h2>
                            <p className="text-justify">
                                The content and services provided on this
                                platform are for entertainment purposes only and
                                do not constitute financial advice.
                            </p>
                            <p className="text-justify">
                                Always conduct your own research before engaging
                                in cryptocurrency-related activities.
                            </p>
                        </li>
                        <li className="mb-6">
                            <h2 className="text-2xl font-semibold">
                                No Guarantees
                            </h2>
                            <p className="text-justify">
                                Purchasing mystery boxes does not guarantee any
                                financial gain or specific outcome.
                            </p>
                            <p className="text-justify">
                                The value of the items revealed in the mystery
                                boxes is speculative and may fluctuate
                                significantly.
                            </p>
                        </li>
                        <li className="mb-6">
                            <h2 className="text-2xl font-semibold">
                                Risk Acknowledgment
                            </h2>
                            <p className="text-justify">
                                Cryptocurrency transactions are highly volatile
                                and involve significant risk.
                            </p>
                            <p className="text-justify">
                                By participating, you acknowledge and accept all
                                associated risks, including potential loss of
                                your initial purchase.
                            </p>
                        </li>
                        <li className="mb-6">
                            <h2 className="text-2xl font-semibold">
                                Limitation of Liability
                            </h2>
                            <p className="text-justify">
                                We are not liable for any losses, damages, or
                                claims arising from your use of this platform or
                                purchases made.
                            </p>
                            <p className="text-justify">
                                All transactions are final, and refunds will not
                                be issued.
                            </p>
                        </li>
                        <li className="mb-6">
                            <h2 className="text-2xl font-semibold">
                                Compliance
                            </h2>
                            <p className="text-justify">
                                By using this platform, you confirm that you
                                comply with your local laws and regulations
                                regarding cryptocurrency usage.
                            </p>
                            <p className="text-justify">
                                If you do not agree to these terms, do not use
                                this platform or purchase any mystery boxes.
                            </p>
                        </li>
                        <li className="mb-6">
                            <h2 className="text-2xl font-semibold">
                                Indemnification
                            </h2>
                            <p className="text-justify">
                                You agree to indemnify, defend, and hold
                                harmless our company, its affiliates, and their
                                respective officers, directors, employees, and
                                agents from and against any and all claims,
                                liabilities, damages, losses, or expenses
                                arising out of or in any way connected with your
                                access to or use of the platform.
                            </p>
                        </li>
                        <li className="mb-6">
                            <h2 className="text-2xl font-semibold">
                                Changes to Terms
                            </h2>
                            <p className="text-justify">
                                We reserve the right to modify these terms at
                                any time. Your continued use of the platform
                                following the posting of changes will mean that
                                you accept and agree to the changes.
                            </p>
                        </li>
                    </ul>
                </div>{' '}
            </SectionContainer>
        </div>
    )
}

export default TermsAndConditions
