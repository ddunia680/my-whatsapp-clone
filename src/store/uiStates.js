import { createSlice } from "@reduxjs/toolkit";

const uiStates = createSlice({
    name: 'uiStates',
    initialState: {
        onAudioCall: false,
        onVideoCall: false,
        newChatUI: false,
        recordingUI: false,
        welcomeView: true,
        signInUI: true
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
        },
        SETSHOWWELCOMEVIEW: (state, action) => {
            state.welcomeView = action.payload;
        },
        SHOWSIGNINVIEW: (state, action) => {
            state.signInUI = action.payload;
        }
    }
});

export const { 
    SETAUDIOCALL, 
    SETVIDEOCALL, 
    SETNEWCHATUIVISIBILITY, 
    SETAUDIOUIVISIBILITY, 
    SETSHOWWELCOMEVIEW,
    SHOWSIGNINVIEW
} = uiStates.actions;
export default uiStates.reducer;