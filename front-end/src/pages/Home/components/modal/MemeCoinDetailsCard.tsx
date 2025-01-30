import { SOLANA_EXPLORER_URL } from 'src/libs/constants';
import { BoxContent } from 'src/libs/interfaces';
import { shortenAddress } from 'src/libs/utils';

 
function MemeCoinDetailsCard({ content }: { content: BoxContent }) {
    return (
        <div
            onClick={() =>
                window.open(
                    `${SOLANA_EXPLORER_URL + 'address/' + content.token.mint}?cluster=mainnet-beta`,
                    '_blank'
                )
            }
            key={content._id}
            className="h-32 flex items-center hover:cursor-pointer border border-accent-secondary/20 shadow-inner hover:shadow-accent/80 shadow-accent/40 rounded-xl p-4 hover:scale-105 transition-transform duration-200"
        >
            <div className="flex flex-col items-center justify-center mr-2 w-16">
                <img
                    src={content.token.image}
                    alt={content.token.name}
                    className="w-12 h-12 rounded-full border-2 border-cyan-400"
                />
                <div className="text-sm text-cyan-200 font-normal">
                    {content.token.symbol}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-lg font-semibold text-white mb-1">
                    {content.token.name}
                </div>
                <div className="text-xs text-gray-300 truncate">
                    <span className="font-semibold text-gray-400">Mint:</span>{' '}
                    {shortenAddress(content.token.mint, 6)}
                </div>
                <div className="text-xs text-gray-300">
                    <span className="font-semibold text-gray-400">Amount:</span>{' '}
                    {(
                        parseInt(content.amount, 10) /
                        10 ** content.token.decimals
                    ).toFixed(2)}
                </div>
                <div className="text-xs text-gray-300">
                    <span className="font-semibold text-gray-400">
                        Percentage:
                    </span>{' '}
                    {content.percentage}%
                </div>
            </div>
        </div>
    );
}

export default MemeCoinDetailsCard; 