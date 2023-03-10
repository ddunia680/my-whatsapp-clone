// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import SearchMessage from "./components/searchMessage/searchMessage";
import MainView from "./containers/mainView/mainView";
import AudioCallUI from "./components/audioCall/audioCallUI";
import VideoCallUI from "./components/videoCallUI/videoCallUI";
import RightView from "./containers/rightView/rightView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGIN, LOGOUT, moreSigninInfo } from "./store/authenticate";

;

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
    if(new Date(expiryDate).getTime() <= new Date().getTime()) {
      dispatch(LOGOUT());
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
    console.log('profile changed');
  }, [profileUrl]);

  const OperateLogout = (milliseconds) => {
    console.log(milliseconds);
    setTimeout(() => {
      dispatch(LOGOUT());
    }, [milliseconds]);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainView/>}/>
        { window.innerWidth <= 500 ? <Route path="/chatWindow" element={<RightView/>}/> : null}
        { window.innerWidth <= 500 ? <Route path="/onAudioCall" element={<AudioCallUI/>}/> : null }
        { window.innerWidth <= 500 ? <Route path="/onVideoCall" element={<VideoCallUI/>}/> : null }
        { window.innerWidth <= 500 ? <Route path="/searchMessage" element={<SearchMessage/>}/> : null}

        <Route path="*" element={<MainView/>}/>
      </Routes>
    </div>
  );
}

export default App;
