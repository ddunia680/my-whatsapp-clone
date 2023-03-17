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

export const createChat = createAsyncThunk(
    'data/createChat',
    (info) => {
        if(info.method === 'POST') {
            return axios.post(info.url, info.data)
            .then(res => {
                // console.log(res.data.chat);
                // console.log(res.data.message);
                return res.data.chat;
            })
        }
    }
);

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
)

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messagesLoadingState: 'idle',
        chatsLoadingState: 'idle',
        messagesArray: [],
        chats: [],
        currentChat: null,
        error: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(uploadMessage.fulfilled, (state, action) => {
            state.messagesArray.push(action.payload);
            // console.log(action.payload);
        })
        .addCase(uploadMessage.rejected, (state, action) => {
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
        .addCase(createChat.fulfilled, (state, action) => {
            state.currentChat = action.payload;
        })

        builder
        .addCase(pullChats.pending, (state, action) => {
            state.chatsLoadingState = 'loading';
        })
        .addCase(pullChats.fulfilled, (state, action) => {
            state.chatsLoadingState = 'succeeded';
            state.chats = action.payload;
        })
        .addCase(pullChats.rejected, (state, action) => {
            state.chatsLoadingState = 'failed';
            state.error = action.error.message;
        })
    }
});

export default messagesSlice.reducer;