import React, { useState } from 'react';
import LeftMenu from '../leftMenu/leftMenu';
import RightView from '../rightView/rightView';
import NewChatView from '../NewChatView/newChatView';
import SearchMessage from '../../components/searchMessage/searchMessage';
import AudioCallUI from '../../components/audioCall/audioCallUI';
import WelcomeRightVIew from '../welcomeRightView/welcomeRightVIew';
import AuthContainer from '../AuthContainer/authContainer';

import { Transition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import VideoCallUI from '../../components/videoCallUI/videoCallUI';

function MainView(props) {
    const newChatUI = useSelector(state => state.uiStates.newChatUI);

    const [showSearchMessagesView, setShowSearchMView] = useState(false);
    const onAudioCall = useSelector(state => state.uiStates.onAudioCall);
    const onVideoCall = useSelector(state => state.uiStates.onVideoCall);
    const welcomeView = useSelector(state => state.uiStates.welcomeView);
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

            {welcomeView && !token ? 
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

                { onAudioCall ? <AudioCallUI/> : null}
                { onVideoCall ? <VideoCallUI/> : null}         
            
        </div>
    );
}

export default MainView;