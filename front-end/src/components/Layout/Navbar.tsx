import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white shadow-md p-4 flex justify-between items-center">
            <div className="text-2xl font-bold">MyApp</div>
            <WalletMultiButton />
        </nav>
    );
};

export default Navbar;