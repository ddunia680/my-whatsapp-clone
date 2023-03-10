import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
    'data/getUsers',
    (info) => {
        if(info.method === 'GET') {
            return axios.get(info.url, {
                headers: {
                    Authorization: 'Bearer ' + info.token
                }
            }).then(res => {
                return res.data.users;
            })
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
       users: [],
       usersLoadingState: 'idle',
       error: ''
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
        .addCase(getAllUsers.pending, (state, action) => {
            state.usersLoadingState = 'loading';
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.usersLoadingState = 'succeeded';
            state.users = action.payload;
            state.users = state.users.filter(usr => usr._id !== localStorage.getItem('userId'));
            // console.log(action.payload);
        })
        .addCase(getAllUsers.rejected, (state, action) => {
            state.usersLoadingState = 'failed';
            state.error = action.error.message;
        })
    }
    
});

export default usersSlice.reducer;