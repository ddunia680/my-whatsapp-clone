import React, { useRef, useState } from 'react';
import { MicrophoneIcon, PaperClipIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { SETAUDIOUIVISIBILITY } from '../../store/uiStates';
import { pullChats, SETCURRENTCHAT, storeLastMessage, uploadMessage } from '../../store/messages';
import axios from 'axios';

function InputControl(props) {
    const token = useSelector(state => state.authenticate.token);
    const userId = useSelector(state => state.authenticate.userId);
    const interlocutor = useSelector(state => state.users.interlocutor);
    const currentChat = useSelector(state => state.messages.currentChat);
    const [textValue, setTextValue] = useState('');
    const fileInput = useRef();
    const dispatch = useDispatch();

    const sendMessageHandler = () => {
        const data = {
            to: interlocutor._id,
            isText: true,
            isImage: false,
            isAudio: false,
            message: textValue 
        }
        const info = {
            method: 'POST',
            url: `${process.env.REACT_APP_BACKEND_URL}message`,
            data: data,
            token: token
        }

        dispatch(uploadMessage(info))
        .then(res => {
            if(currentChat) {
                console.log("currentChat was already set");
                const localInfo = {
                    url: `${process.env.REACT_APP_BACKEND_URL}storeLastMessage`,
                    data: {
                        currentChat: currentChat,
                        message: textValue,
                        sentBy: userId
                    },
                    token: token
                }
                dispatch(storeLastMessage(localInfo)).then(res => {
                    dispatch(pullChats({
                        token: token,
                        url: `${process.env.REACT_APP_BACKEND_URL}getChats`}))
                });
            } else {
                console.log('we instead created the chat');
                    const data = {
                        userId: userId,
                        interlocutor: interlocutor._id
                    }
                axios.post(`${process.env.REACT_APP_BACKEND_URL}create_chat`, data)
                .then(res => {
                        dispatch(SETCURRENTCHAT(res.data.chatId));
                    const localInfo = {
                        url: `${process.env.REACT_APP_BACKEND_URL}storeLastMessage`,
                        data: {
                            currentChat: res.data.chatId,
                            message: textValue,
                            sentBy: userId
                        },
                        token: token
                    }
                    dispatch(storeLastMessage(localInfo)).then(res => {
                        dispatch(pullChats({
                            token: token,
                            url: `${process.env.REACT_APP_BACKEND_URL}getChats`}))
                    });
                })
            }
        })
        setTextValue('');
        
    }


    return (
        <div className='absolute md:relative bottom-0 left-0 w-[100%] bg-primary flex justify-start items-center px-2 md:px-5 space-x-[1rem] md:space-x-[2rem] py-[0.7rem]'>
            <FaceSmileIcon className=" w-[1.5rem] md:w-[2rem] text-mainTextColor"/>
            <PaperClipIcon className="w-[1.3rem] md:w-[1.5rem] text-mainTextColor" title='Attach file' onClick={() => fileInput.current.click()}/>
            <input type="file" ref={fileInput} style={{display: 'none'}} />
            <input type='text' placeholder='Type a message' className='text-sm md:text-md w-[70%] md:w-[80%] h-[2.5rem] bg-mainInput outline-none focus:text-mainTextColor rounded-lg px-5 py-2 overflow-y-wrap' value={textValue} onChange={event => setTextValue(event.target.value)} onKeyDown={e => {
                e.key === 'Enter' && sendMessageHandler()
            }}/>
            {/* <div className='w-[15rem] h-[15rem]'>
                <div className='w-[100%] h-[100%] bg-slate-300 text-gray-700 flex justify-center items-center'>

                </div>
            </div> */}
            {!textValue ? <MicrophoneIcon className="w-[2.4rem] p-[0.5rem] md:w-[2.5rem] text-mainTextColor" title='record voice message' onClick={() => dispatch(SETAUDIOUIVISIBILITY(true))}/>
            :
            <PaperAirplaneIcon className="w-[2.4rem] md:w-[2.5rem] text-mainTextColor p-[0.5rem] rounded-full hover:bg-mainInput" title='send message' onClick={sendMessageHandler}/>}
            
        </div>
    );
}

export default InputControl;