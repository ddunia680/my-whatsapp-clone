import { createSlice } from "@reduxjs/toolkit";

const uiStates = createSlice({
    name: 'uiStates',
    initialState: {
        onAudioCall: false,
        onVideoCall: false,
        newChatUI: false,
        recordingUI: false
    },
    reducers: {
        SETAUDIOCALL: (state, action) => {
            state.onAudioCall = action.payload;
        },
        SETVIDEOCALL: (state, action) => {
            state.onVideoCall = action.payload;
        },
        SETNEWCHATUIVISIBILITY: (state, action) => {
            state.newChatUI = action.payload;
        },
        SETAUDIOUIVISIBILITY: (state, action) => {
            state.recordingUI = action.payload;
        }
    }
});

export const { 
    SETAUDIOCALL, 
    SETVIDEOCALL, 
    SETNEWCHATUIVISIBILITY, 
    SETAUDIOUIVISIBILITY 
} = uiStates.actions;
export default uiStates.reducer;