import React, { useEffect, useRef, useState } from 'react';
import { UserCircleIcon} from '@heroicons/react/24/solid';
import { PhoneIcon, MicrophoneIcon, VideoCameraSlashIcon} from '@heroicons/react/24/outline';
import callInitiated from '../../audios/callReached.mp4';

import { SETVIDEOCALL } from '../../store/uiStates';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom';
import io from '../../utility/socket';
import Peer from 'simple-peer';

function CallOut(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const interlocutor = useSelector(state => state.users.interlocutor);
    const userId = useSelector(state => state.authenticate.userId);
    const username = useSelector(state => state.authenticate.username);
    // const [timeRun, setTimeRun] = useState(0);
    const [stream, setStream] = useState(null);
    // console.log(stream);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [callStatusMessage, setCallStatusMessage] = useState('calling...');
    const IStartedTheCall = useSelector(state => state.uiStates.startedCall);
    // console.log(IStartedTheCall);
    const ISVideoCall = useSelector(state => state.uiStates.callWithVideo);
    const receiptData = useSelector(state => state.messages.callReceptionData);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const [containerPos, setContainerPos] = useState({x: 0, y: 0});
    const bingContainerPos = useDrag((params) => {
        setContainerPos({
            x: params.offset[0],
            y: params.offset[1]
        })
    });

    const containerClasses = ['absolute bg-darkSpecial w-[100%] h-[100%] md:h-[auto] md:w-[25rem] flex flex-col justify-center items-center space-y-5 py-3 shadow-md shadow-gray-600 select-none z-1000'];

    useEffect(() => {
        if(ISVideoCall) {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then(thestream => {
                setStream(thestream);
                setTimeout(() => {
                    myVideo.current.srcObject = thestream;
                }, 2000)
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            navigator.mediaDevices.getUserMedia({video: false, audio: true})
            .then(thestream => {
                setStream(thestream);
            })
            .catch(err => {
                console.log(err);
            });
        }
        if(IStartedTheCall) {
            callInterlocutor();
        } else {
            answerACall();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const callInterlocutor = () => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on('signal', (data) => {
            if(io.getIO()) {
                io.getIO().emit('callUser', {
                    to: interlocutor._id,
                    from: userId,
                    name: username,
                    signalData: data,
                    video: ISVideoCall
                });
            }
        });

        peer.on('stream', (theStream) => {
            console.log(theStream);
            userVideo.current.srcObject = theStream;
        });
        
        io.getIO().on('isRinging', () => {
            setCallStatusMessage('ringing...');
        })

        io.getIO().on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        })

        connectionRef.current = peer;
    }

    const answerACall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on('signal', (data) => {
            // console.log(data);
            io.getIO().emit('answerCall', {signal: data, to: receiptData.from });
        });

        peer.on('stream', (theStream) => {
            console.log(theStream);
            userVideo.current.srcObject = theStream;
        })

        peer.signal(receiptData.signal);
        connectionRef.current = peer;
    }

    const endVideoCallHandler = () => {
        if(window.innerWidth <= 500) {
            if(myVideo.current) {
                const tracks = myVideo.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            navigate('/chatWindow');
        } else {
            if(myVideo.current) {
                const tracks = myVideo.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            dispatch(SETVIDEOCALL(false));
        }
        if(IStartedTheCall) {
            io.getIO().emit('endCall', interlocutor._id);
        } else {
            io.getIO().emit('endCall', receiptData.from);
        }
        
        setCallEnded(true);
        connectionRef.current.destroy();
    }

    return (
        <div style={{
            top: containerPos.y,
            left: containerPos.x
        }} {...bingContainerPos()} className={containerClasses.join(' ')}>
            { !callAccepted ? <audio src={callInitiated} loop autoPlay className='hidden'/> : null}

            {/* My video stream */}
            { stream && ISVideoCall ? (
                <div className='absolute bg-gray-800 w-[50%] h-[30%] right-1 top-1 rounded-xl'>
                        <video ref={myVideo} className='w-[100%] h-[100%] object-contain' muted autoPlay playsInline/>
                </div>) 
            : null}

            { callAccepted && !callEnded ?
                <div className='w-[90%] md:h-[20rem] bg-black md:my-[5rem]'>
                    <video ref={userVideo} className='w-[100%] h-[100%] object-contain' autoPlay playsInline/>
                </div>
            :
                <div className=' w-[90%] md:h-[20rem]  flex flex-col justify-center items-center space-y-5'>
                    <UserCircleIcon className='rounded-full text-primary w-[50%] h-[10rem]'/>
                    <p className='callMessage text-md flex justify-center items-center'>{callStatusMessage}</p>
                </div>
            }
            <div className='absolute bottom-5 w-[100%] flex justify-around items-center'>
                <button className='text-slate-100 py-2 px-4 hover:bg-primary'><MicrophoneIcon className='w-[1.5rem]' title='Switch to audio call'/></button>
                <button className='text-slate-100 py-2 px-4 hover:bg-primary'><VideoCameraSlashIcon className='w-[1.5rem]' title='Mute'/></button>
                <button className='bg-red-500 text-slate-100 p-3 rotate-90'><PhoneIcon className='w-[1.5rem]' title='End call' onClick={endVideoCallHandler} /></button>
            </div>         
        </div>
    );
}

export default CallOut;