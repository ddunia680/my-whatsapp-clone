import { PhoneXMarkIcon, PhoneArrowUpRightIcon } from '@heroicons/react/24/outline';
import receiving from '../../audios/receivingCall.mp4';
import io from '../../utility/socket';

import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { useDispatch, useSelector } from 'react-redux';
import { SETRECEIVINGCALL, SETSTARTEDCALL, SETVIDEOCALL } from '../../store/uiStates';
import { SETCALLRECEPTDATA } from '../../store/messages';
import './audioCallUI.css'
import { useNavigate } from 'react-router-dom';

function AudioCallUI(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [receivingC, setReceivingC] = useState(false);
    const [containerPos, setContainerPos] = useState({x: 0, y: 0});
    const receiptData = useSelector(state => state.messages.callReceptionData);
    const bingContainerPos = useDrag((params) => {
        setContainerPos({
            x: params.offset[0],
            y: params.offset[1]
        })
    });

    const mainClasses = 'absolute z-500 bg-darkSpecial w-[100%] h-[100%] md:h-auto md:w-[17rem] flex flex-col justify-center md:justify-start items-center space-y-5 py-3 shadow-md shadow-gray-600 select-none';

    useEffect(() => {
        setTimeout(() => {
            setReceivingC(true);
        }, 2000);
    }, [])
    
    // console.log(receiptData.name);
    const acceptCall = () => {
        dispatch(SETSTARTEDCALL(false));
        dispatch(SETRECEIVINGCALL(false));
        if(window.innerWidth <= 500) {
            navigate('/onVideoCall');
        } else {
            dispatch(SETVIDEOCALL(true));
        }
    }
    
    const declineCall = () => {
        if(io.getIO()) {
            io.getIO().emit('endCall', receiptData.from);
            dispatch(SETRECEIVINGCALL(false));
            dispatch(SETCALLRECEPTDATA({}))
        }
    }

    return (
        <div {...bingContainerPos()} style={{
            top: containerPos.y,
            left: containerPos.x
        }} className={mainClasses}>
                { receivingC ? <audio src={receiving} loop autoPlay playsInline className='hidden'/> : null}
                <p className='callMessage'> {receiptData.name} is Calling...</p>
                <div className='flex justify-between items-center w-[70%]'>
                    {/* Accept call */}
                    <button className='bg-greenSpecial text-slate-100 p-3 rounded-full buttonShaking' onClick={acceptCall}>
                        <PhoneArrowUpRightIcon className='w-[1.5rem]' title='Accept call' />
                    </button>

                    {/* Decline call */}
                    <button className='bg-red-500 text-slate-100 p-3 rounded-full' onClick={declineCall}>
                        <PhoneXMarkIcon className='w-[1.5rem]' title='End call' />
                    </button>
                </div>
                       
        </div>
    );
}

export default AudioCallUI;