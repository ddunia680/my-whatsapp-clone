import React, { useState } from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightView from '../rightView/rightView';
import NewChatView from '../NewChatView/newChatView';
import SearchMessage from '../../components/searchMessage/searchMessage';
import CallNotification from '../../components/ReceivingCall/callNotification';
import WelcomeRightVIew from '../welcomeRightView/welcomeRightVIew';
import AuthContainer from '../AuthContainer/authContainer';

import { Transition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import VideoCallUI from '../../components/callsCenter/callOut';

function MainView(props) {
    const newChatUI = useSelector(state => state.uiStates.newChatUI);

    const [showSearchMessagesView, setShowSearchMView] = useState(false);
    const onReceivingCall = useSelector(state => state.uiStates.onReceivingCall);
    const onVideoCall = useSelector(state => state.uiStates.onVideoCall);
    const welcomeView = useSelector(state => state.uiStates.welcomeView);
    // const interlocutor = useSelector(state => state.users.newChatUI)
    const token = useSelector(state => state.authenticate.token);

    return (
        <div className='fixed md:flex md:justify-start md:items-start w-[100vw] h-[100vh] bg-darkSpecial 2xl:p-3'>
            { token ? <LeftMenu/> :
            <AuthContainer/>}
            <Transition
            in={newChatUI}
            timeout={300}
            mountOnEnter
            unmountOnExit
            >
                <NewChatView/>
            </Transition>

            {welcomeView || !token ? 
                <WelcomeRightVIew/> : 
                <RightView setShowSearch={ans => setShowSearchMView(ans)}/>
            }

            <Transition
            in={showSearchMessagesView}
            timeout={300}
            mountOnEnter
            unmountOnExit
            >
                <SearchMessage showSearch={showSearchMessagesView} setShowSearch={ans => setShowSearchMView(ans)}/>
            </Transition>
 
                { window.innerWidth > 500 && onReceivingCall ? <CallNotification/> : null}
                { window.innerWidth > 500 && onVideoCall ? <VideoCallUI/> : null} 
                        
            
        </div>
    );
}

export default MainView;