import React from 'react';

const TermsAndConditions: React.FC = () => {
    return (
        <div className="bg-gradient-to-b from-background-dark to-gray-900 w-screen min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="mt-[12%] text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-accent-dark to-purple-500 mb-8 animate-fade-in">
                    Terms of Service
                </h1>

                <div className="bg-red-900/20 p-6 rounded-lg mb-12 border border-red-500 animate-pulse">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ Important Disclaimers</h2>
                    <p className="text-red-200">
                        This is not a financial services platform. All transactions represent non-refundable 
                        entertainment purchases with no guaranteed value. Cryptocurrency values fluctuate 
                        dramatically - you may lose 100% of your purchase value. Consult a financial advisor 
                        before participating.
                    </p>
                </div>

                <div className="space-y-8">
                    {[
                        {
                            title: "1. Binding Agreement",
                            content: "By accessing this platform, you enter a legally binding agreement and affirm you are at least 18 years old, legally competent to contract, and acting in compliance with all applicable laws in your jurisdiction."
                        },
                        {
                            title: "2. No Warranties",
                            content: "We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to merchantability, fitness for purpose, and non-infringement. Services are provided 'as is' and 'as available' without any guarantee of functionality, accuracy, or reliability."
                        },
                        {
                            title: "3. Risk Acceptance",
                            content: "You expressly acknowledge and agree that: (a) cryptocurrency markets are volatile and unpredictable (b) digital assets may have no inherent value (c) you may lose entire purchase value (d) outcomes are randomly generated with no promised return."
                        },
                        {
                            title: "4. Limitation of Liability",
                            content: "Under no circumstances shall Company or its affiliates be liable for any direct, indirect, incidental, special, consequential, or exemplary damages (including but not limited to loss of profits, cryptocurrency, data, or goodwill) arising from platform use, even if advised of potential damages."
                        },
                        {
                            title: "5. Third-Party Services",
                            content: "We disclaim all responsibility for blockchain network operations, wallet providers, or external service interruptions. You are solely responsible for managing private keys and transaction validation."
                        },
                        {
                            title: "6. Prohibited Jurisdictions",
                            content: "Access is void where prohibited. You confirm you are not: (a) subject to OFAC sanctions (b) resident in restricted territories (c) using VPNs to circumvent geo-blocks. We reserve right to freeze suspicious accounts."
                        },
                        {
                            title: "7. No Refunds",
                            content: "All purchases are final. Digital assets are immediately consumed upon purchase - no cancellations, refunds, or exchanges permitted under any circumstances."
                        },
                        {
                            title: "8. Intellectual Property",
                            content: "All platform content, including smart contract code and interface designs, remain our exclusive property. No license is granted beyond personal, non-commercial access."
                        },
                        {
                            title: "9. Dispute Resolution",
                            content: "Any disputes shall be resolved through binding arbitration in [Your Jurisdiction] under [Governing Law]. Class action waivers apply. Legal actions must be initiated within 1 year of claim accrual."
                        },
                        {
                            title: "10. Amendments",
                            content: "We reserve unilateral right to modify these terms without notice. Continued use after changes constitutes acceptance. You must regularly review terms for updates."
                        }
                    ].map((term, index) => (
                        <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-accent-dark transition-all duration-300">
                            <h2 className="text-xl font-bold text-accent-dark mb-3">{term.title}</h2>
                            <p className="text-gray-300 leading-relaxed">{term.content}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center border-t border-gray-700 pt-8">
                    <p className="text-gray-400 text-sm">
                        Last Updated: 29th January 2025 <br />
                        By continuing, you certify under penalty of perjury that you have read, 
                        understood, and voluntarily accept all terms herein. If you do not 
                        understand any provision, consult legal counsel before proceeding.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;