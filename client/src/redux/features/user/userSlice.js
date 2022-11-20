import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../axios/axios'

const initialState = {
    isLoading: false,
    msg: null,
    users: [],
    records: [],
    text: null,
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

export const getAllRecords = createAsyncThunk(
    'user/getAllRecords',
    async(_, {rejectWithValue}) => {
        try {
            const {data} = await axios.get('/user/records')
            return data

        } catch (error) {
            throw rejectWithValue(error.response.data.message) 
        }
    }
)

export const decodeRecord = createAsyncThunk(
    'user/decodeRecord',
    async({id}, {rejectWithValue}) => {
        try {
            const {data} = await axios.post('/user/decode',{id})
            return data

        } catch (error) {
            throw rejectWithValue(error.response.data.message) 
        }
    }
)

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

        [getAllRecords.pending]: (state) => {
            state.isLoading = true
        },
        [getAllRecords.fulfilled]: (state, action) => {
            state.isLoading = false
            state.msg = action.payload.message
            state.records = action.payload.messages
        },
        [getAllRecords.rejected]: (state, action) => {
            state.msg = action.payload
            state.isLoading = false
        },

        [decodeRecord.pending]: (state) => {
            state.isLoading = true
        },
        [decodeRecord.fulfilled]: (state, action) => {
            state.isLoading = false
            state.msg = action.payload.message
            state.text = action.payload.result
        },
        [decodeRecord.rejected]: (state, action) => {
            state.msg = action.payload
            state.isLoading = false
        },
    },

})

export default userSlice.reducer