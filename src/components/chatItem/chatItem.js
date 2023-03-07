import { UserCircleIcon, CheckIcon } from '@heroicons/react/24/solid';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnreadMessage from '../../UI/unreadMessage/unreadMessage';

function ChatItem(props) {

    const openChat = () => {
        if(window.innerWidth <= 500) {
            navigate('/chatWindow');
        } else {
            console.log("You're in full screen");
        }
        
    }
    const navigate = useNavigate();
    return (
        <div className='flex justify-start items-center w-[100%] hover:bg-primary' onClick={() => openChat()}>
            <UserCircleIcon className="w-[2rem] md:w-[3rem] mx-2 md:mx-4 bg-iconsColor text-black rounded-full"/>
            <div className='flex justify-between items-center w-[79%] border-b-[1px] border-gray-500'>
                <div className='flex flex-col justify-start items-start py-2 w-[79%]'>
                    <h2 className='text-gray-100 text-lg'>Charles Dunia</h2>
                    <p className="w-[100%] text-gray-500 text-sm flex flex-row">
                        <CheckIcon className='w-[1rem]'/> Thank you man
                    </p>
                </div>
                <UnreadMessage number='202'/>
            </div>
            
        </div>
    );
}

export default ChatItem;