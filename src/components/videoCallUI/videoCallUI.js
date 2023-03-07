import React, { useState } from 'react';
import { UserCircleIcon} from '@heroicons/react/24/solid';
import { PhoneIcon, MicrophoneIcon, VideoCameraSlashIcon} from '@heroicons/react/24/outline';

import { SETVIDEOCALL } from '../../store/uiStates';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom';

function VideoCallUI(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [containerPos, setContainerPos] = useState({x: 0, y: 0});
    const bingContainerPos = useDrag((params) => {
        setContainerPos({
            x: params.offset[0],
            y: params.offset[1]
        })
    });

    const containerClasses = ['absolute bg-darkSpecial w-[100%] h-[100%] md:h-[auto] md:w-[25rem] flex flex-col justify-center items-center space-y-5 py-3 shadow-md shadow-gray-600 select-none'];

    const endVideoCallHandler = () => {
        if(window.innerHeight <= 500) {
            navigate('/chatWindow');
            dispatch(SETVIDEOCALL(false));
        } else {
            dispatch(SETVIDEOCALL(false));
        }
    }

    return (
        <div style={{
            top: containerPos.y,
            left: containerPos.x
        }} {...bingContainerPos()} className={containerClasses.join(' ')}>
            <div className=' w-[90%] md:h-[20rem]  flex flex-col justify-center items-center space-y-5'>
                <UserCircleIcon className='rounded-full text-primary w-[50%] h-[10rem]'/>
                <p className='callMessage text-md flex justify-center items-center'>The video call is on going...</p>
            </div>
            <div className='absolute bottom-5 w-[100%] flex justify-around items-center'>
                <button className='text-slate-100 py-2 px-4 hover:bg-primary'><MicrophoneIcon className='w-[1.5rem]' title='Switch to audio call'/></button>
                <button className='text-slate-100 py-2 px-4 hover:bg-primary'><VideoCameraSlashIcon className='w-[1.5rem]' title='Mute'/></button>
                <button className='bg-red-500 text-slate-100 p-3 rotate-90'><PhoneIcon className='w-[1.5rem]' title='End call' onClick={endVideoCallHandler} /></button>
            </div>         
        </div>
    );
}

export default VideoCallUI;