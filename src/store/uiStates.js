import { createSlice } from "@reduxjs/toolkit";

const uiStates = createSlice({
    name: 'uiStates',
    initialState: {
        onReceivingCall: false,
        onVideoCall: false,
        startedCall: false,
        callWithVideo: false,
        newChatUI: false,
        recordingUI: false,
        welcomeView: true,
        signInUI: true,
        profileEditView: false,
        myVideoStream: null,
        forgotPassView: false,
        newPasswordView: false,
        tempUserId: ''
    },
    reducers: {
        SETRECEIVINGCALL: (state, action) => {
            state.onReceivingCall = action.payload;
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
        SHOWPROFILEEDITVIEW: (state, action) => {
            state.profileEditView = action.payload;
        },
        SETSTARTEDCALL: (state, action) => {
            state.startedCall = action.payload;
        },
        SETCALLWITHVIDEO: (state, action) => {
            state.callWithVideo = action.payload;
        },
        SETMYSTREAM: (state, action) => {
            state.myVideoStream = action.payload;
        },
        SETFORGOTVIEW: (state, action) => {
            state.forgotPassView = action.payload;
        },
        SETNEWPASSWORD: (state, action) => {
            state.tempUserId = action.payload.userId;
            state.newPasswordView = action.payload.newPass; 
        }
    }
});

export const { 
    SETRECEIVINGCALL, 
    SETVIDEOCALL, 
    SETNEWCHATUIVISIBILITY, 
    SETAUDIOUIVISIBILITY, 
    SETSHOWWELCOMEVIEW,
    SHOWSIGNINVIEW,
    SHOWPROFILEEDITVIEW,
    SETSTARTEDCALL,
    SETCALLWITHVIDEO,
    SETMYSTREAM,
    SETFORGOTVIEW,
    SETNEWPASSWORD
} = uiStates.actions;
export default uiStates.reducer;