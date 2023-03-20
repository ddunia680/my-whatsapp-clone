import React, { useEffect, useState } from 'react';
import { ReactMic } from 'react-mic';
import { TrashIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { PauseCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { SETAUDIOUIVISIBILITY } from '../../store/uiStates';

function AudioRecording(props) {
    const dispatch = useDispatch();
    const recordingUI = useSelector(state => state.uiStates.recordingUI);
    const [recording, setRecording] = useState(false);
    const [timeRecorded, setTimeRecorded] = useState(0);
    const [theAudio, setTheAudio] = useState(null);
    console.log(theAudio);

    useEffect(() => {
        if(recordingUI) {
            setTimeout(() => {
                setRecording(true)
            }, 400);
        }
    }, [recordingUI]);

    useEffect(() => {
        if(theAudio) {
            setTimeout(() => {
                dispatch(SETAUDIOUIVISIBILITY(false));
            }, 300);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theAudio]);

    const storeAudio = (recordingBlob) => {
        setTheAudio(recordingBlob);
    }

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
                <ReactMic
                    className='h-[100%] w-[50%]'
                    backgroundColor='transparent'
                    strokeColor='#c6edef'
                    record={recording}
                    onStop={storeAudio}
                />
                <PauseCircleIcon className='w-[2rem] text-red-500'  title="pause recording"/>
                <PaperAirplaneIcon className='w-[2rem] p-[0.4rem] rounded-full bg-green-600' title="send audio" onClick={() => setRecording(false)}/>
            </div>
            
        </div>
    );
}

export default AudioRecording;