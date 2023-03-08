import WaveForm from '../../UI/waveForm/waveForm';

function Message(props) {

    const interlocutorMessageClasses = " relative bg-primary text-gray-50 mx-w-[20rem] min-w-[7rem] w-[70%] md:w-[40%] p-3 m-2 text-sm rounded-lg";

    const myMessageClasses = 'relative ml-[30%] md:ml-[59%] bg-myMessage text-gray-50 mx-w-[20rem] min-w-[7rem] w-[70%] md:w-[40%] p-3 m-2 text-sm rounded-lg';

    return (
        <div className={!props.me ? interlocutorMessageClasses : myMessageClasses}>
                { props.body ?
                props.body : 
                <WaveForm audio={props.audio}/>
                }
                <div className='absolute bottom-1 right-5 text-xs text-iconsColor'>12:30am</div>
        </div>
    );
}

export default Message;