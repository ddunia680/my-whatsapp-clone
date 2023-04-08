import { Route, Routes } from "react-router-dom";

import SearchMessage from "./components/searchMessage/searchMessage";
import MainView from "./containers/mainView/mainView";
import VideoCallUI from "./components/callsCenter/callOut";
import RightView from "./containers/rightView/rightView";
import CallNotification from "./components/ReceivingCall/callNotification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGIN, LOGOUT, moreSigninInfo } from "./store/authenticate";
import { RESETCURRENTCHAT } from "./store/messages";
import { SETMYSTREAM } from "./store/uiStates";

function App() {
  const dispatch = useDispatch();
  const expiryDate = localStorage.getItem('expiryDate');
  const userId = localStorage.getItem('userId');
  const keptToken = localStorage.getItem('token');
  const token = useSelector(state => state.authenticate.token);
  const profileUrl = useSelector(state => state.authenticate.profileUrl);

// console.log(new Date(expiryDate).getTime() - new Date().getTime());
// console.log("the date now "+new Date().getTime());

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(stream => {
      dispatch(SETMYSTREAM(stream));
    })
    .catch(err => {
      console.log(err);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if(new Date(expiryDate).getTime() <= new Date().getTime()) {
      dispatch(LOGOUT());
      dispatch(RESETCURRENTCHAT());
    }

    if(!token && keptToken) {
      const newTimeout = new Date(expiryDate).getTime() - new Date().getTime();
      console.log('expires in '+ newTimeout);
      OperateLogout(newTimeout);

      const info = {
        method: 'GET',
        url: `http://localhost:8080/auth/moreLoginInfo/${userId}`
    }
    dispatch(LOGIN({token: keptToken, userId: userId}));
    dispatch(moreSigninInfo(info));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  }, [profileUrl]);

  const OperateLogout = (milliseconds) => {
    console.log(milliseconds);
    setTimeout(() => {
      dispatch(LOGOUT());
      dispatch(RESETCURRENTCHAT());
    }, [milliseconds]);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainView/>}/>
        { window.innerWidth <= 500 ? <Route path="/chatWindow" element={<RightView/>}/> : null}
        { window.innerWidth <= 500 ? <Route path="/onVideoCall" element={<VideoCallUI/>}/> : null }
        { window.innerWidth <= 500 ? <Route path="/searchMessage" element={<SearchMessage/>}/> : null}
        { window.innerWidth <= 500 ? <Route path="/receivingCall" element={<CallNotification />}/>: null}

        <Route path="*" element={<MainView/>}/>
      </Routes>
    </div>
  );
}

export default App;
