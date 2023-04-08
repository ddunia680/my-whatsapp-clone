import React, { useEffect, useState } from 'react';
import TopOfChats from '../../components/topOfChatsList/topOfChats';
import SearchBar from '../../components/searchBar/searchBar';
import MyChatItem from '../../components/chatItem/myChatItem';
import { useDispatch, useSelector } from 'react-redux';
import { pullChats, SETCALLRECEPTDATA, SETLASTMESSAGELIVE } from '../../store/messages';
import Spinner from '../../UI/spinner/spinner';
import { ADDLIVEMESSAGE } from '../../store/messages';
import io from '../../utility/socket';
import { SETCALLWITHVIDEO, SETRECEIVINGCALL, SETVIDEOCALL } from '../../store/uiStates';
import { useNavigate } from 'react-router-dom';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

function LeftMenu(props) {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const token = useSelector(state => state.authenticate.token);
    const chatsLoadingState = useSelector(state => state.messages.chatsLoadingState);
    const myChats = useSelector(state => state.messages.chats);
    const receiptData = useSelector(state => state.messages.callReceptionData);
    
    // console.log(myChats);
    const userId = useSelector(state => state.authenticate.userId);
    const [newUnseenM, setNewUnseenM] = useState(0);

    useEffect(() => {
        const info = {
            token: token,
            url: `${process.env.REACT_APP_BACKEND_URL}getChats`
        }
        dispatch(pullChats(info));
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
          io.getIO().on('received message', message => {
            // console.log(message);
            if(message.to.toString() === userId.toString()) {
                dispatch(ADDLIVEMESSAGE(message));
                dispatch(SETLASTMESSAGELIVE({message: message, userId: userId}));
                setNewUnseenM(newUnseenM + 1);
            }
          });

          io.getIO().on('userCalling', (data) => {
            console.log(data);
            if(data.from.toString() !== userId.toString() && data.to.toString() === userId.toString()) {
                if(receiptData === {}) {
                    io.getIO().emit('alreadyOnCall', receiptData.from);
                } else {
                    if(window.innerWidth <= 500) {
                        navigate('/receivingCall');
                    } else {
                        dispatch(SETRECEIVINGCALL(true));
                    }
                    
                    dispatch(SETCALLRECEPTDATA(data));
                    if(data.video) {
                        dispatch(SETCALLWITHVIDEO(true));
                    }
                    io.getIO().emit('ringing', data.from);
                }
            }
          })


          io.getIO().on('callEnded', () => {
                dispatch(SETRECEIVINGCALL(false));
                dispatch(SETCALLWITHVIDEO(false));
                
                if(window.innerWidth <= 500) {
                    navigate('/chatWindow');
                } else {
                    dispatch(SETVIDEOCALL(false));
                }
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