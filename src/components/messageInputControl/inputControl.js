import React, { useRef, useState } from 'react';
import { MicrophoneIcon, PaperClipIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { SETAUDIOUIVISIBILITY } from '../../store/uiStates';

function InputControl(props) {
    const [textValue, setTextValue] = useState('');
    const fileInput = useRef();
    const dispatch = useDispatch();
    return (
        <div className='absolute md:relative bottom-0 left-0 w-[100%] bg-primary flex justify-start items-center px-2 md:px-5 space-x-[1rem] md:space-x-[2rem] py-[0.7rem]'>
            <FaceSmileIcon className=" w-[1.5rem] md:w-[2rem] text-mainTextColor"/>
            <PaperClipIcon className="w-[1.3rem] md:w-[1.5rem] text-mainTextColor" title='Attach file' onClick={() => fileInput.current.click()}/>
            <input type="file" ref={fileInput} style={{display: 'none'}} />
            <textarea type='text' placeholder='Type a message' className='text-sm md:text-md w-[70%] md:w-[80%] h-[2.5rem] bg-mainInput outline-none focus:text-mainTextColor rounded-lg px-5 py-2' onChange={event => setTextValue(event.target.value)}></textarea>
            {/* <div className='w-[15rem] h-[15rem]'>
                <div className='w-[100%] h-[100%] bg-slate-300 text-gray-700 flex justify-center items-center'>

                </div>
            </div> */}
            {!textValue ? <MicrophoneIcon className="w-[2.4rem] p-[0.5rem] md:w-[3rem] text-mainTextColor" title='record voice message' onClick={() => dispatch(SETAUDIOUIVISIBILITY(true))}/>
            :
            <PaperAirplaneIcon className="w-[2.4rem] md:w-[3rem] text-mainTextColor p-[0.5rem] rounded-full hover:bg-mainInput" title='send message'/>}
            {/* <canvas></canvas> */}
            
        </div>
    );
}

export default InputControl;