import React, { useEffect, useRef } from 'react';
import Message from '../message/message';
import './chatWindow.css';
import theAudio from '../../audios/newAudio.mp4';


function ChatWindow(props) {
    const chatWindowUI = useRef();
    const myMessage = "Hey brother, it is really a please to finally see you again after all these years. I'm looking forward to seeing you quite often this coming year";
    const hisMessage = "Sure bro, I really had missed yoou guys too. I will really do my best to be available this year";

    useEffect(() => {
        chatWindowUI.current.scrollTo({
            bottom: 0
        })
    }, []);

    return (
        <div ref={chatWindowUI} className='relative w-[100%] mt-[3.5rem] md:mt-0 mb-[3.5rem] md:mb-0 h-[100%] md:h-[85%] bg-wallpaper overflow-y-scroll chatWindow'>
            <Message me={true} body={myMessage}/>
            <Message me={false} body={hisMessage}/>
            <Message me={false} body='Sure man...'/>
            <Message me={true} body={myMessage}/>
            <Message me={false} body={hisMessage}/>
            <Message me={false} body='Sure man...'/> 
            <Message me={true} body={myMessage}/>
            <Message me={false} body={hisMessage}/>
            <Message me={false} body='Sure man...'/> 
            <Message me={true} body={myMessage}/>
            <Message me={false} audio={theAudio}/>
            <Message me={false} body='Sure man...'/>           
        </div>
    );
}

export default ChatWindow;