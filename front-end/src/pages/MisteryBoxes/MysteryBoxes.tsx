import React from 'react'

export default function MysteryBoxes() {
    const items = [
        {
            name: 'Mystery Fluid Glass',
            image: '/path-to-image1.png',
            price: '$0.00',
        },
        {
            name: 'Mystery Garden Glow',
            image: '/path-to-image2.png',
            price: '$0.00',
        },
        {
            name: 'Mystery Iridescent Shape',
            image: '/path-to-image3.png',
            price: '$0.00',
        },
        // Add more items as needed
    ]

    return (
        <div className="cursor-custom min-h-screen bg-dark-900 text-white p-8">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-cyan-500">
                    Welcome to the Mystery Box!
                </h1>
                <p className="text-gray-400 mt-2">
                    Discover hidden treasures and explore exclusive 3D shapes.
                </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <div className=" shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-cyan-400">
                                {item.name}
                            </h3>
                            <p className="text-gray-300 mt-2">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <footer className="text-center mt-10">
                <button className="px-6 py-3 bg-cyan-500 text-dark-900 font-semibold rounded-lg shadow hover:bg-cyan-400">
                    Open a Mystery Box
                </button>
            </footer>
        </div>
    )
}
