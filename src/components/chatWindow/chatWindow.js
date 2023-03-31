import React, { useEffect, useRef } from 'react';
import Message from '../message/message';
import './chatWindow.css';
// import theAudio from '../../audios/newAudio.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { pullAllMessages } from '../../store/messages';
import Spinner from '../../UI/spinner/spinner';
import { Helmet } from 'react-helmet';

function ChatWindow(props) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.authenticate.token);
    const interlocutor = useSelector(state => state.users.interlocutor);
    const messagesArray = useSelector(state => state.messages.messagesArray);
    const loadingState = useSelector(state => state.messages.messagesLoadingState);
    const chatWindowUI = useRef();
    const bottomDiv = useRef();


    useEffect(() => {
        if(interlocutor) {
            const info = {
            method: 'GET',
            url: `${process.env.REACT_APP_BACKEND_URL}chatMessages/${interlocutor._id}`,
            token: token
            }

            dispatch(pullAllMessages(info));
        }
        
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interlocutor]);

    let chatMessages;
    if(loadingState === 'loading') {
        chatMessages = <Spinner/>
    } else if (loadingState === 'succeeded') {
        if(!messagesArray.length) {
            chatMessages = <p className="text-iconsColor text-center font-semibold text-sm md:text-md">No messages in chat yet</p>
        } else {
            chatMessages = messagesArray.map(mess => {
                return <Message message={mess} key={mess._id} />
            })
        }
    }

    useEffect(() => {
        bottomDiv.current.scrollIntoView({behavior: 'smooth' })
    }, [chatMessages]);

    return (
        <div ref={chatWindowUI} className='relative w-[100%] px-3 mt-[3.5rem] md:mt-0 mb-[3.5rem] md:mb-0 h-[100%] md:h-[85%] bg-wallpaper overflow-y-scroll chatWindow'>
            <Helmet>
                <meta meta name="viewport" content=" width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
            </Helmet>
            {chatMessages}
            <div ref={bottomDiv}/>  
        </div>
    );
}

export default ChatWindow;