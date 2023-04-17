import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import rdvServices from "./rdv.services";

const initialState = {
    rdvs: null,
    rdv: null,

    isError: false,
    isSuccess: false,
    isLoading: false,

    isEditError: false,
    isEditSuccess: false,
    isEditLoading: false,

    isDeleteError: false,
    isDeleteSuccess: false,
    isDeleteLoading: false,

    message: '',
}

export const getRdvs = createAsyncThunk(
    'rdv/list',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await rdvServices.getRdvs(token)
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
export const getRdv = createAsyncThunk(
    'rdv/show',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await rdvServices.getRdv(data, token)
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
export const setRdv = createAsyncThunk(
    'rdv/create',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await rdvServices.setRdv(data, token)
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
export const editRdv = createAsyncThunk(
    'rdv/edit',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await rdvServices.editRdv(data, token)
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

export const rdvSlice = createSlice({
    name: 'rdv',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isEditError = false
            state.isEditLoading = false
            state.isEditSuccess = false
            state.isDeleteError = false
            state.isDeleteLoading = false
            state.isDeleteSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRdvs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRdvs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.rdvs = action.payload
            })
            .addCase(getRdvs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.rdvs = null
            })

            .addCase(getRdv.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRdv.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.rdv = action.payload
            })
            .addCase(getRdv.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.rdv = null
            })

            .addCase(setRdv.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setRdv.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.rdv = action.payload
            })
            .addCase(setRdv.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.rdv = null
            })

            .addCase(editRdv.pending, (state) => {
                state.isEditLoading = true
            })
            .addCase(editRdv.fulfilled, (state, action) => {
                state.isEditLoading = false
                state.isEditSuccess = true
                state.rdv = action.payload
            })
            .addCase(editRdv.rejected, (state, action) => {
                state.isEditLoading = false
                state.isEditError = true
                state.message = action.payload
                state.rdv = null
            })
    },
})

export const { reset } = rdvSlice.actions
export default rdvSlice.reducer