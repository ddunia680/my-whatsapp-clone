import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadMessage = createAsyncThunk(
    'data/uploadMessage',
    (info) => {
        if(info.method === 'POST') {
            return axios.post(info.url, info.data, {
                headers: {
                    Authorization: 'Bearer '+ info.token
                }
            })
            .then(res => {
                return res.data.message;
            })
        }
    }
);

export const uploadAudioMessage = createAsyncThunk(
    'data/uploadAudioM',
    (info) => {
        if(info.method === 'POST') {
            return axios.post(info.url, info.data, {
                headers: {
                    Authorization: 'Bearer '+ info.token
                }
            })
            .then(res => {
                return res.data.message;
            })
        }
    }
)

export const pullAllMessages = createAsyncThunk(
    'data/fullAllMessages',
    (info) => {
        if(info.method === 'GET') {
            return axios.get(info.url, {
                headers: {
                    Authorization: 'Bearer '+ info.token
                }
            })
            .then(res => {
                return res.data.messages;
            })
        }
    }
);

export const findChat = createAsyncThunk(
    'data/findChat', 
    (info) => {
        if(info.method === 'GET') {
            return axios.get(info.url, {
                headers: {
                    Authorization: "Bearer "+ info.token
                }
            })
            .then(res => {
                console.log(res.data.message);
                // console.log(res.data.currentChat);
                return res.data.currentChat;
            })
        }
    }
)

export const pullChats = createAsyncThunk(
    'data/getChats',
    (info) => {
        return axios.get(info.url, {
            headers: {
                Authorization: 'Bearer '+ info.token
            }
        })
        .then(res => {
            return res.data.chats;
        })
    }
);

export const storeLastMessage = createAsyncThunk(
    'data/storeLastM',
    (info) => {
        return axios.post(info.url, info.data, {
            headers: {
                Authorization: 'Bearer '+ info.token
            }
        })
        .then(res => {
            return res.data;
        })
    }
);

export const updateSeen = createAsyncThunk(
    'data/updateSeen',
    (info) => {
        // console.log(info);
        return axios.post(info.url)
        .then(res => {
            return res.data;
        })
    }
)

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messagesLoadingState: 'idle',
        chatsLoadingState: 'idle',
        messagesArray: [],
        chats: [],
        currentChat: null,
        callReceptionData: {},
        error: ''
    },
    reducers: {
        RESETCURRENTCHAT: (state, action) => {
            state.currentChat = null
        },
        SETCURRENTCHAT: (state, action) => {
            state.currentChat = action.payload;
        },
        ADDLIVEMESSAGE: (state, action) => {
            let numberOfRedundant = state.messagesArray.filter(el => el._id.toString() === action.payload._id.toString());
            if(!numberOfRedundant.length) {
                state.messagesArray.push(action.payload);
            }
        },
        SETTYPING: (state, action) => {
            // console.log('we reached here');
            const chatIndex = state.chats.findIndex(chat => chat._id === action.payload);
            const oldLastM = state.chats[chatIndex];
            state.chats[chatIndex].lastMessage = 'typing';
            setTimeout(() => {
                state.chats[chatIndex].lastMessage = oldLastM;
            }, 1500);
        },
        SETLASTMESSAGELIVE: (state, action) => {
            const theChat = state.chats.findIndex(chat => chat.interlocutor._id === action.payload.message.from);
            if(action.payload.message.from !== action.payload.userId) {
                if(action.payload.message.message.includes('mp3')) {
                    state.chats[theChat].lastMessage = 'audio message';
                } else {
                    state.chats[theChat].lastMessage = action.payload.message.message;
                }
            }
            state.chats.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        },
        SETCALLRECEPTDATA: (state, action) => {
            state.callReceptionData = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(uploadMessage.fulfilled, (state, action) => {
            state.messagesArray.push(action.payload);
            console.log(action.payload);
        })
        .addCase(uploadMessage.rejected, (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message;
        })

        builder
        .addCase(uploadAudioMessage.fulfilled, (state, action) => {
            state.messagesArray.push(action.payload);
            console.log(action.payload);
        })
        .addCase(uploadAudioMessage.rejected, (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message;
        })

        builder
        .addCase(pullAllMessages.pending, (state, action) => {
            state.messagesLoadingState = 'loading';
        })
        .addCase(pullAllMessages.fulfilled, (state, action) => {
            state.messagesLoadingState = 'succeeded';
            state.messagesArray = action.payload;
        })
        .addCase(pullAllMessages.rejected, (state, action) => {
            state.messagesLoadingState = 'failed';
            state.error = action.error.message;
        })

        builder
        .addCase(findChat.fulfilled, (state, action) => {
            if(action.payload) {
                state.currentChat = action.payload;
            }
        })

        builder
        .addCase(pullChats.pending, (state, action) => {
            state.chatsLoadingState = 'loading';
        })
        .addCase(pullChats.fulfilled, (state, action) => {
            state.chatsLoadingState = 'succeeded';
            let theChats = action.payload;
            theChats.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            state.chats = theChats;
        })
        .addCase(pullChats.rejected, (state, action) => {
            state.chatsLoadingState = 'failed';
            state.error = action.error.message;
        })
    }
});

export const { 
    RESETCURRENTCHAT, 
    SETCURRENTCHAT, 
    ADDLIVEMESSAGE, 
    SETTYPING, 
    SETLASTMESSAGELIVE,
    SETCALLRECEPTDATA
 } = messagesSlice.actions;
export default messagesSlice.reducer;