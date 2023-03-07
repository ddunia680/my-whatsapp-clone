import { UserCircleIcon} from '@heroicons/react/24/solid';
import { PhoneIcon, MicrophoneIcon, VideoCameraIcon} from '@heroicons/react/24/outline';

import React, { useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { useDispatch } from 'react-redux';
import { SETAUDIOCALL } from '../../store/uiStates';
import './audioCallUI.css'
import { useNavigate } from 'react-router-dom';

function AudioCallUI(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [containerPos, setContainerPos] = useState({x: 0, y: 0});
    const bingContainerPos = useDrag((params) => {
        setContainerPos({
            x: params.offset[0],
            y: params.offset[1]
        })
    });

    const mainClasses = 'absolute z-500 bg-darkSpecial w-[100%] h-[100%] md:h-auto md:w-[17rem] flex flex-col justify-center md:justify-start items-center space-y-5 py-3 shadow-md shadow-gray-600 select-none';

    const endAudioCallHandler = () => {
        if(window.innerHeight <= 500) {
            navigate('/chatWindow');
            dispatch(SETAUDIOCALL(false));
        } else {
            dispatch(SETAUDIOCALL(false));
        }
    }

    return (
        <div {...bingContainerPos()} style={{
            top: containerPos.y,
            left: containerPos.x
        }} className={mainClasses}>
            <p className='callMessage text-md flex flex-col md:flex-row md:justify-center items-center'>
                <UserCircleIcon className='rounded-full md:bg-iconsColor text-primary mt-5 md:mt-0 md:mx-2 w-[90%] md:w-[3rem] h-[60%]'/> 
                The call is on going...</p>
            <div className='absolute md:static bottom-5 w-[100%] flex justify-around items-center'>
                <button className='text-slate-100 py-2 px-4 hover:bg-primary'><VideoCameraIcon className='w-[1.5rem]' title='Switch to video call'/></button>
                <button className='text-slate-100 py-2 px-4 hover:bg-primary'><MicrophoneIcon className='w-[1.5rem]' title='Mute'/></button>
                <button className='bg-red-500 text-slate-100 p-3 rotate-90'><PhoneIcon className='w-[1.5rem]' title='End call' onClick={endAudioCallHandler} /></button>
            </div>         
        </div>
    );
}

export default AudioCallUI;