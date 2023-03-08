import { createSlice } from "@reduxjs/toolkit";

const uiStates = createSlice({
    name: 'uiStates',
    initialState: {
        onAudioCall: false,
        onVideoCall: false,
        newChatUI: false,
        recordingUI: false,
        welcomeView: true,
        signInUI: true,
        authenticated: false
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
        },
        SETAUTHENTICATED: (state, action) => {
            state.authenticated = action.payload;
        }
    }
});

export const { 
    SETAUDIOCALL, 
    SETVIDEOCALL, 
    SETNEWCHATUIVISIBILITY, 
    SETAUDIOUIVISIBILITY, 
    SETSHOWWELCOMEVIEW,
    SHOWSIGNINVIEW,
    SETAUTHENTICATED
} = uiStates.actions;
export default uiStates.reducer;