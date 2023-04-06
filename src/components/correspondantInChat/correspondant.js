import React, { useEffect, useState } from 'react';
import InterlocutorView from '../InterlocutorView/interlocutorView';

import { UserCircleIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { PhoneIcon, VideoCameraIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { SETVIDEOCALL, SETSTARTEDCALL, SETCALLWITHVIDEO } from '../../store/uiStates';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from '../../utility/socket';

function Correspondant(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const interlocutor = useSelector(state => state.users.interlocutor);
    const [liveStatus, setLiveStatus] = useState(false);
    const [displayedLSeen, setDisplayedLSeen] = useState('');
    const currentChat = useSelector(state => state.messages.currentChat);

    const [showInterDetails, setInterDetailsV] = useState(false);
    const [typing, setTyping] = useState('');

    const audioCallHandler = () => {
        dispatch(SETSTARTEDCALL(true));
        dispatch(SETCALLWITHVIDEO(false));
        if(window.innerWidth <= 500) {
            navigate('/onVideoCall');
            dispatch(SETVIDEOCALL(true));
        } else {
            dispatch(SETVIDEOCALL(true));
        }
    }
    const videoCallHandler = () => {
        dispatch(SETSTARTEDCALL(true));
        dispatch(SETCALLWITHVIDEO(true));
        if(window.innerWidth <= 500) {
            navigate('/onVideoCall');
            dispatch(SETVIDEOCALL(true));
        } else {
            dispatch(SETVIDEOCALL(true));
        }
    }

    useEffect(() => {
        if(io.getIO()) {
            io.getIO().on('isOnline', () => {
                setLiveStatus(true);
            })
        }
    }, []);

    useEffect(() => {
        if(io.getIO()) {
            io.getIO().on('isTyping', chatId => {
                if(currentChat.toString() === chatId.toString()) {
                    setTyping('typing...');
                }
            });

            io.getIO().on('isRecording', chatId => {
                if(currentChat.toString() === chatId.toString()) {
                    setTyping('recording...');
                }
            })
        } 
    })

    useEffect(() => {
        if(interlocutor) {
            if(interlocutor.lastSeen) {
                let actualLastSeen = new Date(interlocutor.lastSeen);
                console.log(interlocutor.lastSeen);
                if(interlocutor.lastSeen === 'online') {
                    setDisplayedLSeen(interlocutor.lastSeen);
                } else if(actualLastSeen.getDay() === new Date().getDay()) {
                    setDisplayedLSeen('today at ' + actualLastSeen.getHours() + ':'+actualLastSeen.getMinutes());
                } else {
                    setDisplayedLSeen('on '+ actualLastSeen.getDay() +' at '+ actualLastSeen.getHours()+':'+actualLastSeen.getMinutes());
                }
            }
        }
    }, [interlocutor]);

    useEffect(() => {
        if(typing) {
            setTimeout(() => {
                setTyping('');
            }, 1000)
        }
    }, [typing]);

    return (
        <div className='absolute md:relative top-0 left-0 w-[100%] px-2 md:px-5 flex justify-between items-center bg-primary'>
            <div className='w-[100%] h-[3.5rem] flex justify-start items-center '>
                { window.innerWidth <= 500 ? 
                    <ChevronLeftIcon className='w-[1.5rem] md:w-[3rem] text-green-500' onClick={() => navigate('/')}/> : null}
                    {/* profile pic */}
                { !interlocutor ? 
                    <UserCircleIcon className=" w-[2rem] md:w-[3rem] mx-2 md:mx-4 bg-iconsColor text-black rounded-full"/> :
                    <div className='w-[2rem] h-[2rem] md:h-[3rem] md:w-[3rem] mx-2 md:mx-4 bg-iconsColor rounded-full overflow-hidden'>
                        <img src={interlocutor.profileUrl} alt='profile pic' className='w-[100%] h-[100%]'/>
                    </div>
                }

                {/* status */}
                <div className='flex flex-col justify-start items-start py-2 w-[50%] xl:w-[70%]' onMouseEnter={() => setInterDetailsV(true)} onMouseLeave={() => setInterDetailsV(false)}>
                    <h2 className='text-gray-100 text-md md:text-lg'>{ interlocutor ? interlocutor.username: ''}</h2>
                    { typing ?
                        <p className='text-greenSpecial text-xs md:text-sm'>
                            <i>{typing}</i>
                        </p>
                    :
                        <p className="text-gray-500 text-xs md:text-sm flex flex-row overflow-x-hidden">
                            { interlocutor ? !liveStatus ? !interlocutor.lastSeen ? interlocutor.status : displayedLSeen : 'online' : ''}
                        </p>
                    }
                    
                </div>
            </div>

                {/* calls center */}
            <div className=' w-[50%] md:w-[25%] xl:w-[15%] flex justify-around items-center text-iconsColor text-md md:text-lg'>
                <VideoCameraIcon title='video call' className='w-[1rem]' onClick={videoCallHandler}/>
                <PhoneIcon title='audio call' className='w-[1rem]' onClick={audioCallHandler}/>
            </div>
            <div className='hidden w-[25%] xl:w-[15%] md:flex justify-around items-center border-l-[1px] border-iconsColor'>
                <MagnifyingGlassIcon className="text-iconsColor w-[1rem] rotate-90" title='search message' onClick={() => props.setShowSearch(true)}/>
            </div>
            { showInterDetails ? <InterlocutorView interlocutor={interlocutor} theState={showInterDetails}/> : null}
            
        </div>
    );
}

export default Correspondant;