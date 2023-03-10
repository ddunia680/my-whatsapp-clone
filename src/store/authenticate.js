import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const moreSigninInfo = createAsyncThunk(
    'data/signin',
    (info) => {
        if(info.method === 'GET') {
            return axios.get(info.url)
            .then(res => {
                return res.data;
            })
        }
    }
) 

const authenticationSlice = createSlice({
    name: 'Authenticate',
    initialState: {
        token: '',
        userId: '',
        profileUrl: '',
        username: '',
        status: '',
        error: ''
    },
    reducers: {
        LOGIN: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        LOGOUT: (state, action) => {
            console.log('we logged out');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('expiryDate');

            state.token = '';
            state.userId = '';
            state.profileUrl = '';
            state.username = '';
            state.status = '';
        },
        moreUserInfoLocally: (state, action) => {
            state.profileUrl = action.payload.profileUrl;
            state.username = action.payload.username;
            state.status = action.payload.status;
        }
    },
    extraReducers(builder) {
        builder.addCase(moreSigninInfo.fulfilled, (state, action) => {
            state.profileUrl = action.payload.profileUrl;
            state.username = action.payload.username;
            state.status = action.payload.status;
            // console.log(action.payload);
        })
        .addCase(moreSigninInfo.rejected, (state, action) => {
            console.log(action.error);
            state.error = action.error.message;
        })
    }
});

export const { 
    LOGIN, 
    LOGOUT, 
    moreUserInfoLocally 
} = authenticationSlice.actions;
export default authenticationSlice.reducer;