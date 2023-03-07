import React from 'react';
import Correspondant from '../../components/correspondantInChat/correspondant';
import ChatWindow from '../../components/chatWindow/chatWindow';
import InputControl from '../../components/messageInputControl/inputControl';

function RightView(props) {
    return (
        <div className='relative w-[100%] md:w-[70%] h-[100vh] flex flex-col justify-start items-start'>
            <Correspondant setShowSearch={props.setShowSearch} setOnAudioCall={props.setOnAudioCall}/>
            <ChatWindow/>
            <InputControl/>
        </div>
    );
}

export default RightView;