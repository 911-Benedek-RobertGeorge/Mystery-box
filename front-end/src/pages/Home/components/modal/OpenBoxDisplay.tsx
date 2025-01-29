import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
  import { SOLANA_EXPLORER_URL } from 'src/libs/constants';
import MemeCoinDetailsCard from './MemeCoinDetailsCard';
import questionMark from '@assets/elements/question_mark.png';


const OpenBoxDisplay: React.FC<{ mysteryBox: any,  }> = ({ mysteryBox  }) => {
    return (
        <div className="text-center text-accent/80 text-lg mt-2 font-light  mx-auto">
            {mysteryBox && (
                <div className="text-center space mb-4">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">
                        🎉 Congratulations! 🎉
                    </h2>
                    <p className="text-lg text-accent">
                        You've unlocked these meme treasures!
                    </p>
                    <div className="flex flex-row items-center justify-center text-accent">
                        Worth{' '}
                        <p className="font-semibold text-accent-secondary ml-2">
                            {mysteryBox.claimUsdValue.toFixed(2)} $
                        </p>{' '}
                    </div>
                    <a
                        href={`${SOLANA_EXPLORER_URL}tx/${mysteryBox.claimSignature}`} //?cluster=${networkConfiguration}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline hover:text-cyan-600 transition-colors duration-200 flex flex-row space-x-2 items-center justify-center"
                    >
                        <p> View on chain </p>
                        <FaExternalLinkAlt className="w-4" />{' '}
                    </a>
                </div>
            )}{' '}
            <div className=" ">
                <div className="h-full flex flex-col items-center justify-center m-auto">
                    {!mysteryBox ? (
                        <div className="flex flex-col items-center justify-between h-96">
                            <img
                                src={questionMark}
                                className="animate-ping w-32 mt-12"
                            />{' '}
                            <span className="text-red-600 bottom-0">
                                Do not close this window or refresh page!
                            </span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 w-full  md:grid-cols-2 gap-4  md:max-h-96  mb-4 p-2  ">
                            {mysteryBox?.boxContents?.map(
                                (content: any, index: number) => (
                                    <MemeCoinDetailsCard
                                        key={index}
                                        content={content}
                                    />
                                )
                            )}{' '}
                        </div>
                    )}
                </div>
            </div>{' '}
        </div>
    );
};

export default OpenBoxDisplay; 