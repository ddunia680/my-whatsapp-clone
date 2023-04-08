import { UserCircleIcon, CheckIcon } from '@heroicons/react/24/solid';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SETNEWCHATUIVISIBILITY, SETSHOWWELCOMEVIEW } from '../../store/uiStates';
import { findChat, SETCURRENTCHAT } from '../../store/messages';
import { getInterlocutor } from '../../store/users';
import UnreadMessage from '../../UI/unreadMessage/unreadMessage';
import io from '../../utility/socket';

function ChatItem(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const welcomeView = useSelector(state => state.uiStates.welcomeView);
    const token = useSelector(state => state.authenticate.token);
    const interlocutor = useSelector(state => state.users.interlocutor);
    // const userId = useSelector(state => state.authenticate.userId);

    const openChat = () => {
        const info = {
            method: 'GET',
            url: `${process.env.REACT_APP_BACKEND_URL}list/interlocutor/${props._id}`,
            token: token
        }
        dispatch(SETNEWCHATUIVISIBILITY(false));
        dispatch(getInterlocutor(info));

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

    useEffect(() => {
        if(interlocutor) {
            dispatch(SETCURRENTCHAT(null));
            const theInfo = {
                method: 'GET',
                url: `${process.env.REACT_APP_BACKEND_URL}find_chat/${interlocutor._id}`,
                token: token
            }
            dispatch(findChat(theInfo));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interlocutor]);

    useEffect(() => {
        if(interlocutor) {
            const socket = io.getIO();
                socket.emit('joint_chat', interlocutor._id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interlocutor]);
    
    return (
        <div className='flex justify-start items-center w-[100%] hover:bg-primary cursor-pointer' onClick={() => openChat()}>
            { !props.profile ? 
            <UserCircleIcon className="w-[2rem] md:w-[3rem] mx-2 md:mx-4 bg-iconsColor text-black rounded-full"/> : 
            <div className='w-[2.8rem] h-[2.8rem] rounded-full overflow-hidden mx-2 md:mx-4'>
                <img src={props.profile} alt='the profile' className='w-[100%] h-[100%]'/>
            </div>
            }
            <div className='flex justify-between items-center w-[79%] border-b-[1px] border-gray-500'>
                <div className='flex flex-col justify-start items-start py-2 w-[79%]'>
                    <h2 className='text-gray-100 text-lg overflow-x-hidden'>{props.username}</h2>
                    { props.message ? 
                    <p className="w-[100%] text-gray-500 text-sm flex flex-row">
                        <CheckIcon className='w-[1rem]'/>{props.message}</p> : 
                    <p className='w-[100%] text-gray-500 text-sm flex flex-row'>{props.status}</p>}
                </div>
                { props.message ? <UnreadMessage number='202'/> : null }
            </div>
            
        </div>
    );
}

export default ChatItem;