import { createSlice } from "@reduxjs/toolkit";

const uiStates = createSlice({
    name: 'uiStates',
    initialState: {
        onAudioCall: false,
        onVideoCall: false,
        newChatUI: false,
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
        }
    }
});

export const { SETAUDIOCALL, SETVIDEOCALL, SETNEWCHATUIVISIBILITY } = uiStates.actions;
export default uiStates.reducer;