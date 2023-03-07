import StatusCircle from '../../UI/statusCircle/statusCircle';
import UserMenu from '../UserMenu/userMenu';
import { 
    EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { 
    UserCircleIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/solid';

import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { SETNEWCHATUIVISIBILITY } from '../../store/uiStates';

function TopOfChats(props) {
    const dispatch = useDispatch();
    const [menuIsVisible, setMenuVisibility] = useState(false);

    const menuButtonClasses = ['text-iconsColor w-[2rem] py-[0.5rem]', menuIsVisible ? 'rounded-full bg-mainInput' : null];

    return (
        <div className='relative bg-primary w-[100%] h-[3.5rem] flex justify-between items-center px-2'>
            <UserCircleIcon className=" w-[2rem] md:w-[2.5rem] bg-gray-200 rounded-full"/>
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
                
            </div>            
        </div>
    );
}

export default TopOfChats;