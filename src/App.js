// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import SearchMessage from "./components/searchMessage/searchMessage";
import MainView from "./containers/mainView/mainView";
import AudioCallUI from "./components/audioCall/audioCallUI";
import VideoCallUI from "./components/videoCallUI/videoCallUI";
import RightView from "./containers/rightView/rightView";

;

function App() {
  // const onAudioCall = useSelector(state => state.uiStates.onAudioCall);
  // console.log(onAudioCall);
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
