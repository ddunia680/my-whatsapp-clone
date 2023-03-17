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

import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { SETNEWCHATUIVISIBILITY, SHOWPROFILEEDITVIEW } from '../../store/uiStates';

function TopOfChats(props) {
    const dispatch = useDispatch();
    const profileUrl = useSelector(state => state.authenticate.profileUrl);
    const username = useSelector(state => state.authenticate.username);
    const profileEditView = useSelector(state => state.uiStates.profileEditView);
    const [menuIsVisible, setMenuVisibility] = useState(false);
    // console.log(profileUrl);
    const menuButtonClasses = ['text-iconsColor w-[2rem] py-[0.5rem]', menuIsVisible ? 'rounded-full bg-mainInput' : null];

    return (
        <div className='relative bg-primary w-[100%] h-[3.5rem] flex justify-between items-center px-2'>
            { !profileUrl ? 
            <UserCircleIcon className=" w-[2rem] md:w-[2.5rem] bg-gray-200 rounded-full" title={username ? username : null} onClick={() => dispatch(SHOWPROFILEEDITVIEW(true))}/> :
            <div className='w-[2.8rem] h-[2.8rem] rounded-full overflow-hidden' title={username ? username : null}>
                <img src={profileUrl} alt='profile pic' className='w-[100%] h-[100%]' onClick={() => dispatch(SHOWPROFILEEDITVIEW(true))}/>
            </div>}
            <div className='flex justify-start items-center space-x-7 text-gray-200 text-lg'>
                <StatusCircle/>
                <ChatBubbleBottomCenterTextIcon className=' w-[1.5rem] md:w-[2rem]' title='new Chat' onClick={() => dispatch(SETNEWCHATUIVISIBILITY(true))}/>
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
                
            </div>            
        </div>
    );
}

export default TopOfChats;