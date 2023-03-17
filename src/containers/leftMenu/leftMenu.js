import React, { useEffect } from 'react';
import TopOfChats from '../../components/topOfChatsList/topOfChats';
import SearchBar from '../../components/searchBar/searchBar';
import MyChatItem from '../../components/chatItem/myChatItem';
import { useDispatch, useSelector } from 'react-redux';
import { pullChats } from '../../store/messages';
import Spinner from '../../UI/spinner/spinner';

function LeftMenu(props) {
    let dispatch = useDispatch();
    const token = useSelector(state => state.authenticate.token);
    const chatsLoadingState = useSelector(state => state.messages.chatsLoadingState);
    const myChats = useSelector(state => state.messages.chats);
    console.log(myChats);
    useEffect(() => {
        const info = {
            token: token,
            url: 'http://localhost:8080/getChats'
        }
        dispatch(pullChats(info))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let chats;
    if(chatsLoadingState === 'loading') {
        chats = <p className='mx-auto'><Spinner/></p>
    } else if(myChats.length < 0) {
        chats = myChats.map(singleChat => {
            return <MyChatItem 
                        username={singleChat.username}
                        profile={singleChat.profileURL}
                        message={singleChat.lastMessage}
                        status={singleChat.status}
                        />
        })
    } else if(!myChats.length) {
        chats = <p className='text-iconsColor text-sm mx-auto'>No Chats yet</p>
    }
    else if(chatsLoadingState === 'failed') {
        chats = <p className='text-iconsColor text-sm mx-auto'>Chats couldn't be loaded...</p>
    }
    
    return (
        <div className='w-[100%] bg-darkSpecial min-w-[20rem] md:w-[30%] h-[100vh] flex flex-col justify-start items-start border-r-[1px] border-gray-500'>
            <TopOfChats showNewCartV={props.showNewCartV}/>
            <SearchBar filter={true} placeHolder="Search or start a new chat"/>
            {chats}
            
        </div>
    );
}

export default LeftMenu;