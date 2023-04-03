import StatusCircle from '../../UI/statusCircle/statusCircle';
import UserMenu from '../UserMenu/userMenu';
import ProfileChange from '../profileChange/profileChange';
import { 
    EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { 
    UserCircleIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/solid';

import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { SETNEWCHATUIVISIBILITY, SHOWPROFILEEDITVIEW } from '../../store/uiStates';

function TopOfChats(props) {
    const dispatch = useDispatch();
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const username = useSelector(state => state.authenticate.username);
    const profileEditView = useSelector(state => state.uiStates.profileEditView);
    const chatsLoadingState = useSelector(state => state.messages.chatsLoadingState);
    const myChats = useSelector(state => state.messages.chats);
    const [menuIsVisible, setMenuVisibility] = useState(false);
    const [guideVisible, setguideVisibility] = useState(false);
    // console.log(profileUrl);
    const menuButtonClasses = ['text-iconsColor w-[2rem] py-[0.5rem]', menuIsVisible ? 'rounded-full bg-mainInput' : null];

    useEffect(() => {
        if(chatsLoadingState === 'succeeded' && !myChats.length) {
            setguideVisibility(true);
        }
    }, [chatsLoadingState, myChats]);

    return (
        <div className='relative bg-primary w-[100%] h-[3.5rem] flex justify-between items-center px-2'>
            {/* Profile picture */}
            { !profileUrl ? 
            <UserCircleIcon className=" w-[2rem] md:w-[2.5rem] bg-gray-200 rounded-full" title={username ? username : null} onClick={() => dispatch(SHOWPROFILEEDITVIEW(true))}/> :
            <div className='w-[2.8rem] h-[2.8rem] rounded-full overflow-hidden' title={username ? username : null}>
                <img src={profileUrl} alt='profile pic' className='w-[100%] h-[100%]' onClick={() => dispatch(SHOWPROFILEEDITVIEW(true))}/>
            </div>}
            <div className='flex justify-start items-center space-x-7 text-gray-200 text-lg'>
                {/* Status Round */}
                <StatusCircle/>

                {/* New Chat Icon */}
                <ChatBubbleBottomCenterTextIcon className='relative w-[1.5rem] md:w-[2rem]' title='new Chat' onClick={() => {
                    dispatch(SETNEWCHATUIVISIBILITY(true));
                    if(guideVisible) {
                        setguideVisibility(false);
                    }
                    }}/>

                <EllipsisVerticalIcon title="Menu" className={menuButtonClasses.join(' ')} onClick={() => setMenuVisibility(!menuIsVisible
                    )}/>
                <Transition 
                in={menuIsVisible}
                timeout={300}
                mountOnEnter
                unmountOnExit
                >
                    <UserMenu isVisible={menuIsVisible} menuVisibility={ans => setMenuVisibility(ans)}/>
                </Transition>
                <Transition 
                in={profileEditView}
                timeout={300}
                mountOnEnter
                unmountOnExit
                >
                    <ProfileChange/>
                </Transition>
                { guideVisible ?
                <div className='absolute bg-yellow-500 p-[1rem] top-[3rem] rounded-full text-sm'>
                    Hello! Click here to start a new chat
                    <div className='absolute w-[1rem] h-[1rem] top-[-0.3rem] left-[2rem] bg-yellow-500 rotate-45'></div>
                    </div> 
                : null}             
            </div>            
        </div>
    );
}

export default TopOfChats;