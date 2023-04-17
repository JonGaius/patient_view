import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authServices from "./auth.services";

const user = JSON.parse(localStorage.getItem('auth-accompagnant'))
const userId = JSON.parse(localStorage.getItem('auth-accompagnant-id'))

const initialState = {
    user: user ? user : null,
    userId: userId ? userId : null,
    me: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isEditError: false,
    isEditSuccess: false,
    isEditLoading: false,
    message: '',
}

export const login = createAsyncThunk(
'auth/login',
async (data, thunkAPI) => {
    try {
        return await authServices.login(data)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getMe = createAsyncThunk(
    'auth/me',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            const data = thunkAPI.getState().auth.userId
            return await authServices.getMe(data, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const logout = createAsyncThunk(
'auth/logout',
async () => {
    await authServices.logout()
})
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isEditError = false
            state.isEditLoading = false
            state.isEditSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.me = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.me = null
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.me = action.payload
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.me = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer