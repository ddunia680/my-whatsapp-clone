import { ArrowLeftIcon} from '@heroicons/react/24/outline';

import React, { useEffect } from 'react';
import SearchBar from '../../components/searchBar/searchBar';
import ChatItem from '../../components/chatItem/chatItem';
import './newChatView.css';
import { useDispatch, useSelector } from 'react-redux';
import { SETNEWCHATUIVISIBILITY } from '../../store/uiStates';
import { getAllUsers } from '../../store/users';
import Spinner from '../../UI/spinner/spinner';

function NewChatView(props) {
    const dispatch = useDispatch();
    const newChatUI = useSelector(state => state.uiStates.newChatUI);
    const userId = useSelector(state => state.authenticate.userId);
    const usersLoadingState = useSelector(state => state.users.usersLoadingState);
    const usersArray = useSelector(state => state.users.users);
    const token = useSelector(state => state.authenticate.token);


    const newChartClasses = ['absolute top-0 left-0 bg-darkSpecial w-[100%] md:min-w-[20rem] md:w-[30%] h-[100vh] flex flex-col justify-start items-start border-r-[1px] border-gray-500 z-100', newChatUI ? 'NewVVisible' : 'NewVInvisible'];

    useEffect(() => {
        const info = {
            method: 'GET',
            url: `${process.env.REACT_APP_BACKEND_URL}list/users/${userId}`,
            token: token
        }

        dispatch(getAllUsers(info));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let list;
    if(usersLoadingState === 'loading') {
        list = <div className='text-center'><Spinner/></div>
    } else if(usersLoadingState === 'succeeded') {
        list = usersArray.map(usr => (
            <ChatItem profile={usr.profileUrl} username={usr.username} status={usr.status} _id={usr._id} key={usr._id}/>
            ))
    } else if(usersLoadingState === 'failed') {
        list = <p className='text-center text-mainTextColor'>Oops, Something went wrong...</p>
    } else if(!usersArray.length) {
        list = <p className='text-center text-mainTextColor'>You're the only user the App has</p>
    }

    return (
        <div className={newChartClasses.join(' ')}>
            <div className=' bg-primary w-[100%] h-[7.5rem] flex justify-start items-end pb-5 text-[18px] font-semibold text-gray-200 space-x-[2rem] px-[2rem]'>
                <ArrowLeftIcon className='w-[1.7rem]' onClick={() => dispatch(SETNEWCHATUIVISIBILITY(false))}/>
                <h1>New Chat</h1>
            </div>
            <SearchBar filter={false} placeHolder="Search contact"/>
            <div className='w-[100%] overflow-y-scroll newChat'>
                {list}
            </div>
            

            
        </div>
    );
}

export default NewChatView;