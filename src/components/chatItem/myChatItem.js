import { UserCircleIcon, CheckIcon } from '@heroicons/react/24/solid';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SETNEWCHATUIVISIBILITY, SETSHOWWELCOMEVIEW } from '../../store/uiStates';
import { SETCURRENTCHAT } from '../../store/messages';
import { SETINTERLOCUTORLOCALLY } from '../../store/users';
import UnreadMessage from '../../UI/unreadMessage/unreadMessage';
import io from '../../utility/socket';

function MyChatItem(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const welcomeView = useSelector(state => state.uiStates.welcomeView);
    const userId = useSelector(state => state.authenticate.userId);
    const interlocutor = useSelector(state => state.users.interlocutor);
    const currentChat = useSelector(state => state.messages.currentChat);

    const days = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const chatItemClasses = ['flex justify-between items-center w-[100%] hover:bg-primary', currentChat ? currentChat.toString() === props.chatId ? 'bg-currentChat' : null : null];

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

    useEffect(() => {
        if(interlocutor) {
            const socket = io.getIO();
                socket.emit('joint_chat', interlocutor._id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interlocutor]);
    
    return (
        <div className={chatItemClasses.join(' ')} onClick={() => openChat()}>
            { !props.profile ? 
            <UserCircleIcon className="w-[2rem] md:w-[3rem] mx-2 md:mx-4 bg-iconsColor text-black rounded-full"/> : 
            <div className='ml-5 md:ml-0 w-[2.8rem] h-[2.8rem] rounded-full overflow-hidden mx-2 md:mx-4'>
                <img src={props.profile} alt='the profile' className='w-[100%] h-[100%]'/>
            </div>
            }
            <div className='flex justify-between items-center w-[79%] border-b-[1px] border-gray-500'>
                <div className='flex flex-col justify-start items-start py-2 w-[79%]'>
                    <h2 className='text-gray-100 text-lg'>{props.username}</h2>
                    <p className="w-[100%] h-[1rem] text-gray-500 text-sm flex flex-row truncate ...">
                        { props.sentBy.toString() === userId.toString() ? <CheckIcon className='w-[1rem]'/> : null}
                        {props.message}</p>
                </div>
                <div className='flex flex-col justify-between items-center h-[100%] w-[30%]'>
                    <p className='text-[10px] text-iconsColor'>
                        { new Date(props.updatedAt).getDay() === new Date().getDay() ? new Date(props.updatedAt).getHours()+':'+ new Date(props.updatedAt).getMinutes() : 
                            days[+new Date(props.updatedAt).getDay()] + ' '+
                            new Date(props.updatedAt).getDate()+'/'+ months[+new Date(props.updatedAt).getMonth()]+'/'+new Date(props.updatedAt).getFullYear()
                        }
                    </p>
                    { props.message ? <UnreadMessage number='20'/> : null }
                </div>
                
            </div>
            
        </div>
    );
}

export default MyChatItem;