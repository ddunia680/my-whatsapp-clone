import WaveForm from '../../UI/waveForm/waveForm';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';

import { useDispatch, useSelector } from "react-redux";
import { SETMESSAGEINTOVIEW, updateSeen } from '../../store/messages';
import pdfFile from '../../images/pdfFile.png';
import { useEffect } from 'react';
import { useRef } from 'react';

function Message(props) {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticate.userId);
    const messageToView = useSelector(state => state.messages.toshowIntoView);

    const me = useRef();
    
    const interlocutorMessageClasses = " relative bg-primary text-gray-50 mx-w-[20rem] min-w-[7rem] w-[70%] md:w-[40%] p-3 m-2 text-sm rounded-xl rounded-bl-none";

    const myMessageClasses = 'relative ml-[30%] md:ml-[59%] bg-myMessage text-gray-50 mx-w-[20rem] min-w-[7rem] w-[70%] md:w-[40%] p-3 m-2 text-sm rounded-xl rounded-br-none';

    useEffect(() => {
        if(props.message) {
            if(props.message.from.toString() !== userId.toString()) {
                if(props.message.seen === false) {
                    let info = {
                        url: `${process.env.REACT_APP_BACKEND_URL}updateSeen/${props.message._id}`,
                    }

                dispatch(updateSeen(info));
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(messageToView === props.message._id) {
            me.current.scrollIntoView({behavior: 'smooth', block: 'center'});

            setTimeout(() => {
                dispatch(SETMESSAGEINTOVIEW(''));
            }, 10000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageToView]);

    return (
        <div className={props.message.from.valueOf() !== userId.toString() ? interlocutorMessageClasses : myMessageClasses} ref={me}>
                {/* If audio */}
                { props.message.isAudio ? 
                    <WaveForm audio={ props.message.message } from={props.message.from} createdAt={props.message.createdAt}/>
                    // If file...
                : props.message.isImage ?
                    <div className=' relative w-[100%] h-[100%] flex flex-col justify-start items-start'>
                        { props.message.message.includes('pdf') ?
                            <div className=' relative w-[100%] h-[5rem] rounded-lg overflow-hidden bg-slate-100'>
                                <img src={pdfFile} alt='' className='w-[100%] h-[100%] object-contain'/>
                                <a href={props.message.message}>
                                    <ArrowDownCircleIcon className=' absolute right-1 bottom-1 w-[2rem] text-red-700 hover:text-red-900' title='click to download'/>
                                </a>
                            </div>
                        :
                            <div className=' relative w-[100%] h-[10rem] rounded-lg overflow-hidden bg-primary'>
                                <img src={props.message.message} alt='' className='w-[100%] h-[100%] object-contain'/>
                                <a href={props.message.message}>
                                    <ArrowDownCircleIcon className=' absolute right-1 bottom-1 w-[2rem] text-red-700 hover:text-red-900' title='click to download'/>
                                </a>
                            </div>
                        }
                        <p>{props.message.comment}</p>
                        <div className='absolute bottom-[-15px] md:bottom-[-13px] right-5 text-[10px] md:text-xs text-iconsColor'>
                            {new Date(props.message.createdAt).getHours()+':'+new Date(props.message.createdAt).getMinutes()}
                        </div>
                    </div>
                :
                    // If text message
                    <>
                    {props.message.message}
                        <div className='absolute bottom-1 right-5 text-[10px] md:text-xs text-iconsColor'>
                            {new Date(props.message.createdAt).getHours()+':'+new Date(props.message.createdAt).getMinutes()}
                        </div>
                    </>
                }
        </div>
    );
}

export default Message;