import React, { useState } from 'react';
import ChatMenu from '../chatMenu/chatMenu';

import { UserCircleIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { PhoneIcon, VideoCameraIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { Transition } from 'react-transition-group';
import { SETAUDIOCALL, SETVIDEOCALL } from '../../store/uiStates';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Correspondant(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const interlocutor = useSelector(state => state.users.interlocutor);
    const [menuIsVisible, setMenuVisibility] = useState(false);

    const menuButtonClasses = ['text-iconsColor w-[3rem] p-[0.5rem]', menuIsVisible ? 'rounded-full bg-mainInput' : null];

    const audioCallHandler = () => {
        if(window.innerWidth <= 500) {
            navigate('/onAudioCall');
            dispatch(SETAUDIOCALL(true));
        } else {
            dispatch(SETAUDIOCALL(true));
        }
    }
    const videoCallHandler = () => {
        if(window.innerWidth <= 500) {
            navigate('/onVideoCall');
            dispatch(SETVIDEOCALL(true));
        } else {
            dispatch(SETVIDEOCALL(true));
        }
    }

    return (
        <div className='absolute md:relative top-0 left-0 w-[100%] px-2 md:px-5 flex justify-between items-center bg-primary'>
            <div className='w-[100%] h-[3.5rem] flex justify-start items-center '>
                { window.innerWidth <= 500 ? 
                    <ChevronLeftIcon className='w-[1.5rem] md:w-[3rem] text-green-500' onClick={() => navigate('/')}/> : null}
                { !interlocutor ? 
                    <UserCircleIcon className=" w-[2rem] md:w-[3rem] mx-2 md:mx-4 bg-iconsColor text-black rounded-full"/> :
                    <div className='w-[2rem] h-[2rem] md:h-[3rem] md:w-[3rem] mx-2 md:mx-4 bg-iconsColor rounded-full overflow-hidden'>
                        <img src={interlocutor.profileUrl} alt='profile pic' className='w-[100%] h-[100%]'/>
                    </div>
                }
                <div className='flex flex-col justify-start items-start py-2 w-[50%] xl:w-[70%]'>
                    <h2 className='text-gray-100 text-md md:text-lg'>{ interlocutor ? interlocutor.username: ''}</h2>
                    <p className="text-gray-500 text-xs md:text-sm flex flex-row">
                        { interlocutor ? interlocutor.status : ''}</p>
                </div>
            </div>

            <div className=' w-[50%] md:w-[25%] xl:w-[15%] flex justify-around items-center text-iconsColor text-md md:text-lg'>
                <VideoCameraIcon title='video call' className='w-[1.3rem]' onClick={videoCallHandler}/>
                <PhoneIcon title='audio call' className='w-[1.3rem]' onClick={audioCallHandler}/>
            </div>
            <div className='hidden w-[25%] xl:w-[15%] md:flex justify-around items-center border-l-[1px] border-iconsColor'>
                <MagnifyingGlassIcon className="text-iconsColor w-[1.3rem]" title='search message' onClick={() => props.setShowSearch(true)}/>
                <EllipsisHorizontalIcon className={menuButtonClasses.join(' ')} title='menu' onClick={() => setMenuVisibility(!menuIsVisible)}/>
            </div>
            <Transition
            in={menuIsVisible}
            timeout={300}
            mountOnEnter
            unmountOnExit
            >
                <ChatMenu isVisible={menuIsVisible} menuVisibility={ans => setMenuVisibility(ans)}/>
            </Transition>
            
        </div>
    );
}

export default Correspondant;