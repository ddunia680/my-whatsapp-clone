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

    const [currentTime, setCurrentTime] = useState('');
    const [fullTime, setFullTime] = useState('')

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
        // console.log(waveSurfer.getDuration());
        waveSurfer.load(props.audio)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer;
            // console.log(Math.floor(waveSurfer.getDuration()).toString().length);
            setFullTime( Math.floor(waveSurfer.getDuration()) < 60 ? Math.floor(waveSurfer.getDuration()).toString().length > 1 ? '0:'+ Math.floor(waveSurfer.getDuration()) : '0:0'+ Math.floor(waveSurfer.getDuration()) : Math.floor(waveSurfer.getDuration()) / 60 +':'+Math.floor(waveSurfer.getDuration()) % 60);
        });

        waveSurfer.on('audioprocess', () => {
            let currentTimeL = Math.floor(waveSurfer.getCurrentTime()) < 60 ? '0:0'+ Math.floor(waveSurfer.getCurrentTime()) : Math.floor(waveSurfer.getCurrentTime()) / 60 +':'+Math.floor(waveSurfer.getCurrentTime()) % 60;
            setCurrentTime(currentTimeL);
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
        <div className='w-[80%] flex flex-col justify-start items-start overflow-hidden'>
            <div ref={containerRef} className='w-[100%] h-[85%] overflow-hidden z-0'/>
            <div className='w-[100%] flex justify-between items-center'>
                <p className='text-[10px] md:text-xs text-iconsColor'>{currentTime}/{fullTime}</p>
                <p className='text-[10px] md:text-xs text-iconsColor'>
                    {new Date(props.createdAt).getHours()+':'+new Date(props.createdAt).getMinutes()}
                </p>
            </div>
        </div>
        { props.from.toString() === userId.toString() ? 
            profileUrl ?
                <div className='w-[2rem] h-[2rem] rounded-full overflow-hidden'>
                    <img src={profileUrl} alt='Prof pic' />
                </div>
            : <UserCircleIcon className='w-[2rem]'/>
        : props.from.toString() === interlocutor._id ? 
            interlocutor.profileUrl ? 
                <div className='w-[2rem] h-[2rem] rounded-full overflow-hidden bg-slate-400'>
                    <img src={interlocutor.profileUrl} alt='Prof pic' className='w-[100%] h-[100%] object-contain' />
                </div>
            : <UserCircleIcon className='w-[2rem]'/>
        : <UserCircleIcon className='w-[2rem]'/> }
    </div>
    );
}

export default WaveForm;