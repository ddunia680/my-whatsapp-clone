import { ArrowLeftIcon} from '@heroicons/react/24/outline';

import React from 'react';
import SearchBar from '../../components/searchBar/searchBar';
import ChatItem from '../../components/chatItem/chatItem';
import './newChatView.css';
import { useDispatch, useSelector } from 'react-redux';
import { SETNEWCHATUIVISIBILITY } from '../../store/uiStates';

function NewChatView(props) {
    const dispatch = useDispatch();
    const newChatUI = useSelector(state => state.uiStates.newChatUI);
    const newChartClasses = ['absolute top-0 left-0 bg-darkSpecial w-[100%] md:min-w-[20rem] md:w-[30%] h-[100vh] flex flex-col justify-start items-start border-r-[1px] border-gray-500 z-100', newChatUI ? 'NewVVisible' : 'NewVInvisible'];
    console.log(newChatUI);

    return (
        <div className={newChartClasses.join(' ')}>
            <div className=' bg-primary w-[100%] h-[7.5rem] flex justify-start items-end pb-5 text-[18px] font-semibold text-gray-200 space-x-[2rem] px-[2rem]'>
                <ArrowLeftIcon className='w-[1.7rem]' onClick={() => dispatch(SETNEWCHATUIVISIBILITY(false))}/>
                <h1>New Chat</h1>
            </div>
            <SearchBar filter={false} placeHolder="Search contact"/>
            <div className='w-[100%] overflow-y-scroll newChat'>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                {/* <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/> */}
            </div>
            

            
        </div>
    );
}

export default NewChatView;