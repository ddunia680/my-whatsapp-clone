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
import { SETCALLRECEPTDATA } from '../../store/messages';

function CallOut(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const interlocutor = useSelector(state => state.users.interlocutor);
    const userId = useSelector(state => state.authenticate.userId);
    const username = useSelector(state => state.authenticate.username);
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    // const [controls, setControls] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [callStatusMessage, setCallStatusMessage] = useState('calling...');
    const IStartedTheCall = useSelector(state => state.uiStates.startedCall);
    const ISVideoCall = useSelector(state => state.uiStates.callWithVideo);
    const receiptData = useSelector(state => state.messages.callReceptionData);
    const myStream = useSelector(state => state.uiStates.myVideoStream);
    const [videoStreamOn, setVideoStreamOn] = useState(false);
    const [audioStreamOn, setAudioStreamOn] = useState(true);

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

    const videoToggleClasses = ['py-2 px-4 hover:bg-primary rounded-full', videoStreamOn ? 'bg-gray-100 text-slate-700' : 'text-slate-100'];

    const audioToggleClasses = ['py-2 px-4 hover:bg-primary rounded-full', audioStreamOn ? 'bg-gray-100 text-slate-700' : 'text-slate-100'];

    useEffect(() => {
        if(ISVideoCall) {
                if(myStream) {
                    myVideo.current.srcObject = myStream;
                }
                setVideoStreamOn(true);
        } else {
            if(myStream) {
                myVideo.current.srcObject = myStream;
            }
            setVideoStreamOn(false);
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
            stream: myStream
        });

        peer.on('signal', (data) => {
            if(io.getIO()) {
                io.getIO().emit('callUser', {
                    to: interlocutor._id,
                    from: userId,
                    name: username,
                    prof: profileUrl,
                    signalData: data,
                    video: ISVideoCall
                });
            }
        });

        peer.on('stream', (theStream) => {
            console.log(theStream);
            userVideo.current.srcObject = theStream;
        })

        io.getIO().on('isAlreadyOnCall', () => {
            setCallStatusMessage('Already on another call...')
        })
        
        io.getIO().on('isRinging', () => {
            setCallStatusMessage('ringing...');
        })

        io.getIO().on('callAccepted', (signal) => {
            console.log('call answered!');
            setCallAccepted(true);
            peer.signal(signal);
        })

        connectionRef.current = peer;
    }

    useEffect(() => {
        let videoTrack = myStream.getTracks().find(track => track.kind === 'video');
        let AudioTrack = myStream.getTracks().find(track => track.kind === 'audio');

        if(videoStreamOn) {
            videoTrack.enabled = true;
        } else {
            videoTrack.enabled = false;
        }

        if(audioStreamOn) {
            AudioTrack.enabled = true;
        } else {
            AudioTrack.enabled = false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoStreamOn, audioStreamOn]);

    const answerACall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: myStream
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
            navigate('/chatWindow');
        } else {
            dispatch(SETVIDEOCALL(false));
        }
        if(IStartedTheCall) {
            io.getIO().emit('endCall', interlocutor._id);
        } else {
            io.getIO().emit('endCall', receiptData.from);
        }
        
        setCallEnded(true);
        dispatch(SETCALLRECEPTDATA({}));
        connectionRef.current.destroy();
    }

    return (
        <div style={{
            top: containerPos.y,
            left: containerPos.x
        }} {...bingContainerPos()} className={containerClasses.join(' ')}>
            { !callAccepted ? <audio src={callInitiated} loop autoPlay className='hidden'/> : null}

            {/* My video stream */}
            { myStream ? (
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
            {/* Controls */}
                <div className='absolute bottom-5 w-[100%] flex justify-around items-center'>
                    <button className={audioToggleClasses.join(' ')} onClick={() => setAudioStreamOn(!audioStreamOn)}>
                        <MicrophoneIcon className='w-[1.5rem]' title='Mute Audio'/>
                    </button>
                    <button className={videoToggleClasses.join(' ')} onClick={() => setVideoStreamOn(!videoStreamOn)}>
                        <VideoCameraSlashIcon className='w-[1.5rem]' title='Mute Camera'/>
                    </button>
                    <button className='bg-red-700 text-slate-100 p-3 rotate-90 rounded-full hover:bg-red-500' onClick={endVideoCallHandler}>
                        <PhoneIcon className='w-[1.5rem]' title='End call' />
                    </button>
                </div>                     
        </div>
    );
}

export default CallOut;