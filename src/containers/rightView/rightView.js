import React, { useEffect } from 'react';
import Correspondant from '../../components/correspondantInChat/correspondant';
import ChatWindow from '../../components/chatWindow/chatWindow';
import InputControl from '../../components/messageInputControl/inputControl';
import AudioRecording from '../../components/audioRecording/audioRecording';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function RightView(props) {
    const navigate = useNavigate();
    const recordingUI = useSelector(state => state.uiStates.recordingUI);
    const interlocutor = useSelector(state => state.users.interlocutor);

    useEffect(() => {
        if(!interlocutor) {
            navigate('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className='relative w-[100%] md:w-[70%] h-[100vh] flex flex-col justify-start items-start'>
            <Correspondant setShowSearch={props.setShowSearch} setOnAudioCall={props.setOnAudioCall}/>
            <ChatWindow/>
            { !recordingUI ? <InputControl/> :
            <AudioRecording/>}
        </div>
    );
}

export default RightView;