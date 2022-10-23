import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../axios/axios'

const initialState = {
    isLoading: false,
    msg: null,
    users: [],
}

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (_,{rejectWithValue}) => {
        try {
            const {data} = await axios.get('/user')
            return data
            
        } catch (error) {
            throw rejectWithValue(error.response.data.message)   
        }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllUsers.pending]: (state) => {
            state.isLoading = true
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.msg = action.payload.message
            state.users = action.payload.users
        },
        [getAllUsers.rejected]: (state, action) => {
            state.msg = action.payload
            state.isLoading = false
        },
    },

})

export default userSlice.reducer