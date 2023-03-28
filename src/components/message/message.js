import WaveForm from '../../UI/waveForm/waveForm';

import { useSelector } from "react-redux";

function Message(props) {
    const userId = useSelector(state => state.authenticate.userId);

    const interlocutorMessageClasses = " relative bg-primary text-gray-50 mx-w-[20rem] min-w-[7rem] w-[70%] md:w-[40%] p-3 m-2 text-sm rounded-xl rounded-bl-none";

    const myMessageClasses = 'relative ml-[30%] md:ml-[59%] bg-myMessage text-gray-50 mx-w-[20rem] min-w-[7rem] w-[70%] md:w-[40%] p-3 m-2 text-sm rounded-xl rounded-br-none';

    return (
        <div className={props.message.from.valueOf() !== userId.toString() ? interlocutorMessageClasses : myMessageClasses}>
                {/* { props.body ?
                props.body : 
                <WaveForm audio={props.audio}/>
                } */}
                { props.message.isAudio ? 
                    <WaveForm audio={ props.message.message } from={props.message.from}/>
                :
                    <>
                    {props.message.message}
                        <div className='absolute bottom-1 right-5 text-xs text-iconsColor'>
                            {new Date(props.message.createdAt).getHours()+':'+new Date(props.message.createdAt).getMinutes()}
                        </div>
                    </>
                }
        </div>
    );
}

export default Message;