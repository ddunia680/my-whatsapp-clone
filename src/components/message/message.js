import WaveForm from '../../UI/waveForm/waveForm';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';

import { useSelector } from "react-redux";
import pdfFile from '../../images/pdfFile.png';

function Message(props) {
    const userId = useSelector(state => state.authenticate.userId);

    const interlocutorMessageClasses = " relative bg-primary text-gray-50 mx-w-[20rem] min-w-[7rem] w-[70%] md:w-[40%] p-3 m-2 text-sm rounded-xl rounded-bl-none";

    const myMessageClasses = 'relative ml-[30%] md:ml-[59%] bg-myMessage text-gray-50 mx-w-[20rem] min-w-[7rem] w-[70%] md:w-[40%] p-3 m-2 text-sm rounded-xl rounded-br-none';

    return (
        <div className={props.message.from.valueOf() !== userId.toString() ? interlocutorMessageClasses : myMessageClasses}>
                {/* If audio */}
                { props.message.isAudio ? 
                    <WaveForm audio={ props.message.message } from={props.message.from} createdAt={props.message.createdAt}/>
                    // If file...
                : props.message.isImage ?
                    <div className=' relative w-[100%] h-[100%] flex flex-col justify-start items-start'>
                        { props.message.message.includes('pdf') ?
                            <div className=' relative w-[100%] h-[5rem] rounded-lg overflow-hidden bg-slate-100'>
                                <img src={pdfFile} alt='' className='w-[80%] h-[100%]'/>
                                <a href={props.message.message}>
                                    <ArrowDownCircleIcon className=' absolute right-1 bottom-1 w-[2rem] text-red-700 hover:text-red-900' title='click to download'/>
                                </a>
                            </div>
                        :
                            <div className=' relative w-[100%] h-[10rem] rounded-lg overflow-hidden bg-primary'>
                                <img src={props.message.message} alt='' className='w-[100%]'/>
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