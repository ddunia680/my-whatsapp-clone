import React, { useEffect, useRef, useState } from 'react';
import Wavesurfer from 'wavesurfer.js';
import { PlayIcon, PauseIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';

function WaveForm(props) {
    const containerRef = useRef();
    const waveSurferRef = useRef({
        isPlaying: () => false,
    });
    const [isPlaying, toggleIsPlaying] = useState(false);
    const userId = useSelector(state => state.authenticate.userId);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const interlocutor = useSelector(state => state.users.interlocutor);
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
        waveSurfer.load(props.audio)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
        })

        return () => {
            waveSurfer.destroy();
        }
    }, [props.audio]);


    return (
    <div className='flex justify-center items-center space-x-3 w-[100%]'>
        <button onClick={() => {
             waveSurferRef.current.playPause()
             toggleIsPlaying(waveSurferRef.current.isPlaying())
            }} type="button">
            {isPlaying ? <PauseIcon className='w-[1.5rem]'/> : <PlayIcon className='w-[1.5rem]'/>}
        </button>
        <div ref={containerRef}/>
        { props.from.toString() === userId.toString() ? 
            profileUrl ?
                <div className='w-[2rem] h-[2rem] rounded-full overflow-hidden'>
                    <img src={profileUrl} alt='Prof pic' />
                </div>
            : <UserCircleIcon className='w-[2rem]'/>
        : props.from.toString() === interlocutor._id ? 
            interlocutor.profileUrl ? 
                <div className='w-[2rem] h-[2rem] rounded-full overflow-hidden'>
                    <img src={interlocutor.profileUrl} alt='Prof pic' />
                </div>
            : <UserCircleIcon className='w-[2rem]'/>
        : <UserCircleIcon className='w-[2rem]'/> }
    </div>
    );
}

export default WaveForm;