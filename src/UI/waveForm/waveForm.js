import React, { useEffect, useRef, useState } from 'react';
import Wavesurfer from 'wavesurfer.js';
import { PlayIcon, PauseIcon, UserCircleIcon } from '@heroicons/react/24/solid';

function WaveForm({ audio }) {
    const containerRef = useRef();
    const waveSurferRef = useRef({
        isPlaying: () => false,
    });
    const [isPlaying, toggleIsPlaying] = useState(false);
    // console.log(waveSurferRef.current);

    useEffect(() => {
        const waveSurfer = Wavesurfer.create({
            container: containerRef.current,
            height: 40 ,
            responsive: true,
            cursorColor: "#146514",
            cursorWidth: 0,
            barWidth: 2,
            barHeight: 10,
            fillParent: false,
            minPxPerSec: 
                window.innerWidth < 500? 50 : 
                window.innerWidth >= 500 && window.innerWidth < 900? 40 :
                window.innerWidth >= 900 && window.innerWidth < 1000? 60 :
                window.innerWidth >= 1100 && window.innerWidth < 1400? 80 :
                window.innerWidth > 1400 && window.innerWidth < 1600? 120 : 130 
        });
        waveSurfer.load(audio)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
        })

        return () => {
            waveSurfer.destroy();
        }
    }, [audio]);


    return (
    <div className='flex justify-center items-center space-x-3 w-[100%]'>
        <button onClick={() => {
             waveSurferRef.current.playPause()
             toggleIsPlaying(waveSurferRef.current.isPlaying())
            }} type="button">
            {isPlaying ? <PauseIcon className='w-[1.5rem]'/> : <PlayIcon className='w-[1.5rem]'/>}
        </button>
        <div ref={containerRef}/>
        <UserCircleIcon className='w-[2rem]'/>
    </div>);
}

export default WaveForm;