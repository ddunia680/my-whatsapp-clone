import React, { useEffect } from 'react';
import TopOfChats from '../../components/topOfChatsList/topOfChats';
import SearchBar from '../../components/searchBar/searchBar';
import MyChatItem from '../../components/chatItem/myChatItem';
import { useDispatch, useSelector } from 'react-redux';
import { pullChats, SETLASTMESSAGELIVE, SETTYPING } from '../../store/messages';
import Spinner from '../../UI/spinner/spinner';
import { ADDLIVEMESSAGE } from '../../store/messages';
import io from '../../utility/socket';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

function LeftMenu(props) {
    let dispatch = useDispatch();
    const token = useSelector(state => state.authenticate.token);
    const chatsLoadingState = useSelector(state => state.messages.chatsLoadingState);
    const myChats = useSelector(state => state.messages.chats);
    // console.log(myChats);
    const userId = useSelector(state => state.authenticate.userId);
    // const currentChat = useSelector(state => state.messages.currentChat);

    useEffect(() => {
        const info = {
            token: token,
            url: `${process.env.REACT_APP_BACKEND_URL}getChats`
        }
        dispatch(pullChats(info))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const socket = io.init(ENDPOINT);
        socket.emit("setup", userId);
        socket.on('connection');
        console.log('socket connected');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(io) {
          io.getIO().on('received-message', message => {
            // console.log(message);
            dispatch(ADDLIVEMESSAGE(message));
            dispatch(SETLASTMESSAGELIVE({message: message, userId: userId}));
          });

          io.getIO().on('typing', chatID => {
            console.log('typing');
            dispatch(SETTYPING(chatID));
          })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let chats;
    if(chatsLoadingState === 'loading') {
        chats = <div className='mx-auto'><Spinner/></div>
    } else if(chatsLoadingState === 'succeeded') {
        if(myChats.length === 0) {
            chats = <p className='text-iconsColor text-sm mx-auto'>No Chats yet</p>
            alert('welcome!!! click the chat icon on top of your screen to start a chat with a user');
        } else {
            chats = myChats.map(singleChat => {
            return <MyChatItem 
                        inter={singleChat.interlocutor}
                        interId={singleChat.interlocutor._id}
                        username={singleChat.interlocutor.username}
                        profile={singleChat.interlocutor.profileUrl}
                        message={singleChat.lastMessage}
                        sentBy={singleChat.sentBy}
                        updatedAt={singleChat.updatedAt}
                        chatId={singleChat._id}
                        key={singleChat._id}
                    />
            })
        }
        
    
    } else if(chatsLoadingState === 'failed') {
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