import { UserCircleIcon} from '@heroicons/react/24/solid';
import { PhoneIcon, MicrophoneIcon, VideoCameraIcon} from '@heroicons/react/24/outline';

import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { useDispatch, useSelector } from 'react-redux';
import { SETAUDIOCALL } from '../../store/uiStates';
import './audioCallUI.css'
import { useNavigate } from 'react-router-dom';
import peer from '../../utility/peer';

function AudioCallUI(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const interlocutor = useSelector(state => state.users.interlocutor);
    // const userId = useSelector(state => state.authenticate.userId);
    const [timeRun, setTimeRun] = useState(0);
    const [callStarted, setCallStarted] = useState(false);
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

    useEffect(() => {
        if(peer.usePeer()) {
            const conn = peer.usePeer().connect(interlocutor._id);
            conn.on('open', () => {
                conn.send('hi');
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

     useEffect(() => {
        if(callStarted) {
          setInterval(()=> {
            setTimeRun(timeRun + 1);
        }, 1000);
        } else {
          setTimeRun(timeRun);
        }
      }, [callStarted, timeRun]);

    return (
        <div {...bingContainerPos()} style={{
            top: containerPos.y,
            left: containerPos.x
        }} className={mainClasses}>
            <div className='text-md flex flex-col md:flex-row md:justify-center items-center'>
                { interlocutor.profileUrl ?
                    <div className='mt-5 md:mt-0 md:mx-2 w-[90%] md:w-[3rem] h-[60%] rounded-full overflow-hidden'>
                        <img src={interlocutor.profileUrl} alt='' className='w-[100%] h-[100%] object-contain'/>
                    </div>
                :
                    <UserCircleIcon className='rounded-full md:bg-iconsColor text-primary mt-5 md:mt-0 md:mx-2 w-[90%] md:w-[3rem] h-[60%]'/>
                }
                <p className='callMessage'>The call is on going...</p>
            </div>
            <h3 className='text-2xl font-bold text-iconsColor'>{interlocutor.username}</h3>
            { callStarted ? 
                <h5 className='text-mainTextColor text-sm'>{ timeRun / 60 > 1 ? timeRun / 60 : '0'}:{timeRun < 10 ? '0' : null}{timeRun}</h5> 
            : null}
            <div className='absolute md:static bottom-5 w-[100%] flex justify-around items-center'>
                <button className='text-slate-100 py-2 px-4 hover:bg-primary'><VideoCameraIcon className='w-[1.5rem]' title='Switch to video call'/></button>
                <button className='text-slate-100 py-2 px-4 hover:bg-primary'><MicrophoneIcon className='w-[1.5rem]' title='Mute'/></button>
                <button className='bg-red-500 text-slate-100 p-3 rotate-90'><PhoneIcon className='w-[1.5rem]' title='End call' onClick={endAudioCallHandler} /></button>
            </div>         
        </div>
    );
}

export default AudioCallUI;