import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../axios/axios'

const initialState = {
    isLoading: false,
    status: false,
    code: null,
    role: null,
    msg: null,
    error: null,
    submitted: false,
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({username, password},{rejectWithValue}) => {
        try {
            const {data} = await axios.post('/auth/login', {
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
            const {data} = await axios.post('/auth/registration', {
                username,
                email,
                password})
            
            return data

        } catch (error) {
            throw rejectWithValue(error.response.data.message)  
        }
    }

)

export const regSubmitCode = createAsyncThunk(
    'auth/regSubmitCode',
    async ({code},{rejectWithValue}) => {
        try {
            const {data} = await axios.post('/auth/registration/verification', {code})
            return data

        } catch (error) {
            throw rejectWithValue(error.response.data.message)   
        }
    }
)

export const authSubmitCode = createAsyncThunk(
    'auth/authSubmitCode',
    async ({code},{rejectWithValue}) => {
        try {
            const {data} = await axios.post('/auth/login/verification', {code})
            return data

        } catch (error) {
            throw rejectWithValue(error.response.data.message)   
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoading = false
            state.status = false
            state.submitted = false
            state.code = null
            state.role = 'USER'
        },
        clearError: (state) => {
            state.error = null
        },
        clearMsg: (state) => {
            state.msg = null
        },
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.msg = action.payload.message
            state.code = action.payload.code
            state.status = true
            state.role = action.payload.role
        },
        [loginUser.rejected]: (state, action) => {
            state.error = action.payload
            state.isLoading = false
            state.status = false
        },

        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.msg = action.payload.message
            state.code = action.payload.code
            state.status = true
            state.role = action.payload.role
        },
        [registerUser.rejected]: (state, action) => {
            state.error = action.payload
            state.isLoading = false
            state.status = false
        },

        [regSubmitCode.pending]: (state) => {
            state.isLoading = true
        },
        [regSubmitCode.fulfilled]: (state, action) => {
            state.isLoading = false
            state.msg = action.payload.message
            state.submitted = true
        },
        [regSubmitCode.rejected]: (state, action) => {
            state.error = action.payload
            state.isLoading = false
            state.submitted = false
        },

        [authSubmitCode.pending]: (state) => {
            state.isLoading = true
        },
        [authSubmitCode.fulfilled]: (state, action) => {
            state.isLoading = false
            state.msg = action.payload.message
            state.submitted = true
        },
        [authSubmitCode.rejected]: (state, action) => {
            state.error = action.payload
            state.isLoading = false
            state.submitted = false
        },
    },

})

export const {logout, clearError, clearMsg} = authSlice.actions

export default authSlice.reducer