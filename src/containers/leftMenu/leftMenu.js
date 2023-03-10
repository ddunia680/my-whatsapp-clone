import React from 'react';
import TopOfChats from '../../components/topOfChatsList/topOfChats';
import SearchBar from '../../components/searchBar/searchBar';
import ChatItem from '../../components/chatItem/chatItem';

function leftMenu(props) {
    return (
        <div className='w-[100%] bg-darkSpecial min-w-[20rem] md:w-[30%] h-[100vh] flex flex-col justify-start items-start border-r-[1px] border-gray-500'>
            <TopOfChats showNewCartV={props.showNewCartV}/>
            <SearchBar filter={true} placeHolder="Search or start a new chat"/>
            <ChatItem username='Maria PM' status='hello there' message='nice to see you man'/>
            <ChatItem username='Maria PM' status='hello there' message='nice to see you man'/>
            <ChatItem username='Maria PM' status='hello there' message='nice to see you man'/>
            
        </div>
    );
}

export default leftMenu;