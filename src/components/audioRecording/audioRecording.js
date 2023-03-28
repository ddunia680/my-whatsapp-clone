import React, { useEffect, useState } from 'react';
import { TrashIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { PauseCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { SETAUDIOUIVISIBILITY } from '../../store/uiStates';
import { pullChats, SETCURRENTCHAT, storeLastMessage, uploadAudioMessage } from '../../store/messages';
import soundWave from '../../gifs/sound.json';
import Lottie from 'lottie-react';
import vmsg from 'vmsg';
import axios from 'axios';

const recorder = new vmsg.Recorder({
    wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
});

function AudioRecording(props) {
    const dispatch = useDispatch();
    const recordingUI = useSelector(state => state.uiStates.recordingUI);
    const token = useSelector(state => state.authenticate.token);
    const userId = useSelector(state => state.authenticate.userId);
    const interlocutor = useSelector(state => state.users.interlocutor);
    const currentChat = useSelector(state => state.messages.currentChat);
    const [recording, setRecording] = useState(false);
    const [timeRecorded, setTimeRecorded] = useState(0);
    const [theAudio, setTheAudio] = useState(null);

    const record = async () => {
        if(recording) {
            console.log('we stopped recording');
            const blob = await recorder.stopRecording();
            setRecording(false);
            setTheAudio(blob);
        } else {
            try {
                console.log('we are recording');
                await recorder.initAudio();
                await recorder.initWorker();
                recorder.startRecording();
                setRecording(true);
            } catch(e) {
                console.log(e);
            }
            
        }
      }

    useEffect(() => {
        if(recordingUI) {
            setTimeout(() => {
                record();
            }, 400);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordingUI]);

    useEffect(() => {
        if(theAudio) {
            setTimeout(() => {
                dispatch(SETAUDIOUIVISIBILITY(false));
            }, 300);

            const theMessage = new FormData();
            theMessage.append('image', theAudio);
            theMessage.append('to', interlocutor._id );

            const info = {
                method: 'POST',
                url: `${process.env.REACT_APP_BACKEND_URL}sendAudio`,
                data: theMessage,
                token: token
            }
            dispatch(uploadAudioMessage(info))
            .then(res => {
                if(currentChat) {
                    console.log("currentChat was already set");
                    const localInfo = {
                        url: `${process.env.REACT_APP_BACKEND_URL}storeLastMessage`,
                        data: {
                            currentChat: currentChat,
                            message: 'audio message',
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
                                message: 'audio message',
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
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theAudio]);

    useEffect(() => {
        if(recording) {
          setInterval(()=> {
            setTimeRecorded(timeRecorded + 1);
        }, 1000);
        } else {
          setTimeRecorded(timeRecorded);
        }
      }, [recording, timeRecorded]);

    return (
        <div className='absolute md:relative bottom-0 left-0 w-[100%] h-[4rem] bg-primary flex justify-end items-center px-2 md:px-5 space-x-[1rem] md:space-x-[2rem] py-[0.7rem] text-mainTextColor'>
            <div className='w-[25rem] h-[100%] flex justify-center items-center space-x-2 '>
                <TrashIcon className='w-[1.5rem]' onClick={() => dispatch(SETAUDIOUIVISIBILITY(false))} title="cancel recording"/>
                <h5 >{ timeRecorded / 60 > 1 ? timeRecorded / 60 : '0'}:{timeRecorded < 10 ? '0' : null}{timeRecorded}</h5>
                <Lottie animationData={soundWave} className='h-[10rem]' />
                <PauseCircleIcon className='w-[2rem] text-red-500'  title="pause recording"/>
                <PaperAirplaneIcon className='w-[2rem] p-[0.4rem] rounded-full bg-green-600' title="send audio" onClick={record}/>
            </div>
            
        </div>
    );
}

export default AudioRecording;