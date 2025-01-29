import React from 'react';
 import prism from '@assets/shapes/prism.png'
import simpleBox from '@assets/elements/simple_box.png'
import stand from '@assets/shapes/stand.png'
import questionMark from '@assets/elements/question_mark.png'
import boom from '@assets/coins/boom.png'
import mow from '@assets/coins/mow.png'
 import wif from '@assets/coins/wif.png'
 
const HeroSectionBox: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const images = [prism, simpleBox, stand, questionMark, boom, mow, wif];

    React.useEffect(() => {
        let loadedImages = 0;
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedImages += 1;
                if (loadedImages === images.length) {
                    setLoading(false);
                }
            };
        });
    }, []);

    if (loading) {
        return      <div className="flex justify-center items-center h-full">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    
    }
        return (
        <div className=" scale-75 md:scale-80 md:-top-24 relative z-[102] flex flex-col justify-center items-center">
        <img
            src={questionMark}
            className="w-[250px] z-[50] absolute -top-48 floating-object transition-transform duration-200 ease-out "
         ></img>{' '}
        <div className=" bg-transparent absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-32 md:w-60 md:h-64 rounded-3xl shadow-cone"></div>
        <img
            src={simpleBox}
            className="w-[450px]  z-[40] hover:scale-110 transition-transform duration-[3000ms] ease-out"
            style={{ transformStyle: 'preserve-3d' }}
        ></img>{' '}
        <img
            src={stand}
            className="scale-[1] absolute top-24 z-[30]"
            style={{ transformStyle: 'preserve-3d' }}
        ></img>
        <img
            src={wif}
            className=" scale-[0.5] absolute top-[22rem] left-12 z-[30]  rotate-45  "
            style={{ transformStyle: 'preserve-3d' }}
        ></img>{' '}
        <img
            src={boom}
            className="scale-[0.5] absolute top-[19rem] left-64 z-[30] -rotate-12  "
            style={{ transformStyle: 'preserve-3d' }}
        ></img>{' '}
        <img
            src={mow}
            className=" w-24 absolute top-96 -left-16 z-[30] rotate-12"
        ></img>{' '}
        <img
            src={stand}
            className="scale-[1.2] absolute top-40 z-[20]"
            style={{ transformStyle: 'preserve-3d' }}
        ></img>
        <img
            src={stand}
            className="scale-[1.5] absolute top-60 z-[10]"
            style={{ transformStyle: 'preserve-3d' }}
        ></img>{' '}
        <img
            src={prism}
            className="scale-[0.3] absolute top-72 left-64 z-[10] rotate-12 "
            style={{ transformStyle: 'preserve-3d' }}
        ></img>
    </div> 
    );
};

export default HeroSectionBox;