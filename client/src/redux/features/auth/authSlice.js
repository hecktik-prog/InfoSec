import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../axios/axios'

const initialState = {
    isLoading: false,
    status: false,
    code: null,
    username: null,
    msg: null,
    submitted: false,
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({username, password},{rejectWithValue}) => {
        try {
            const {data} = await axios.post('/auth/test', {
                username,
                password,
            })

            return data
            
        } catch (error) {
            throw rejectWithValue(error.response.data.message)   
        }
})

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({username, email, password}, {rejectWithValue}) => {
        try {
            const {data} = await axios.post('/auth/test', {
                username,
                email,
                password})
            
            return data

        } catch (error) {
            throw rejectWithValue(error.response.data.message)  
        }
    }

)

export const submitCode = createAsyncThunk(
    'auth/submitCode',
    async ({code},{rejectWithValue}) => {
        try {
            const {data} = await axios.post('/auth/submit', {code})
            return data

        } catch (error) {
            throw rejectWithValue(error.response.data.message)   
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.msg = action.payload.message
            state.code = action.payload.code
            state.status = true
        },
        [loginUser.rejected]: (state, action) => {
            state.msg = action.payload
            state.isLoading = false
            state.status = false
        },

        [submitCode.pending]: (state) => {
            state.isLoading = true
        },
        [submitCode.fulfilled]: (state, action) => {
            state.isLoading = false
            state.msg = action.payload.message
            state.submitted = true
        },
        [submitCode.rejected]: (state, action) => {
            state.msg = action.payload
            state.isLoading = false
            state.submitted = false
        },
    },

})

export default authSlice.reducer