import { UserCircleIcon, CheckIcon } from '@heroicons/react/24/solid';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SETNEWCHATUIVISIBILITY, SETSHOWWELCOMEVIEW } from '../../store/uiStates';
import { SETCURRENTCHAT } from '../../store/messages';
import { SETINTERLOCUTORLOCALLY } from '../../store/users';
import UnreadMessage from '../../UI/unreadMessage/unreadMessage';

function MyChatItem(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const welcomeView = useSelector(state => state.uiStates.welcomeView);
    const userId = useSelector(state => state.authenticate.userId);

    const openChat = () => {
        dispatch(SETNEWCHATUIVISIBILITY(false));
        dispatch(SETINTERLOCUTORLOCALLY(props.inter));
        dispatch(SETCURRENTCHAT(props.chatId));
        if(window.innerWidth <= 500) {
            navigate('/chatWindow');
        } else {
            if(welcomeView) {
                dispatch(SETSHOWWELCOMEVIEW(false));
            } else {
                console.log('Data for chat should be fetched');
            } 
        }
        
    }
    
    return (
        <div className='flex justify-start items-center w-[100%] hover:bg-primary' onClick={() => openChat()}>
            { !props.profile ? 
            <UserCircleIcon className="w-[2rem] md:w-[3rem] mx-2 md:mx-4 bg-iconsColor text-black rounded-full"/> : 
            <div className='w-[2.8rem] h-[2.8rem] rounded-full overflow-hidden mx-2 md:mx-4'>
                <img src={props.profile} alt='the profile' className='w-[100%] h-[100%]'/>
            </div>
            }
            <div className='flex justify-between items-center w-[79%] border-b-[1px] border-gray-500'>
                <div className='flex flex-col justify-start items-start py-2 w-[79%]'>
                    <h2 className='text-gray-100 text-lg'>{props.username}</h2>
                    <p className="w-[100%] text-gray-500 text-sm flex flex-row">
                        { props.sentBy.toString() === userId.toString() ? <CheckIcon className='w-[1rem]'/> : null}
                        {props.message}</p>
                </div>
                { props.message ? <UnreadMessage number='202'/> : null }
            </div>
            
        </div>
    );
}

export default MyChatItem;