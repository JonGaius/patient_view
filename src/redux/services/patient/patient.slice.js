import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import patientService from "./patient.service";

const initialState = {
    patients: [],
    patient: null,
    type_patient: [],

    isError: false,
    isSuccess: false,
    isLoading: false,

    isCreateError: false,
    isCreateSuccess: false,
    isCreateLoading: false,

    isSearchError: false,
    isSearchSuccess: false,
    isSearchLoading: false,

    isTError: false,
    isTSuccess: false,
    isTLoading: false,

    isEditError: false,
    isEditSuccess: false,
    isEditLoading: false,

    isDeleteError: false,
    isDeleteSuccess: false,
    isDeleteLoading: false,

    message: '',
}
export const getPatients = createAsyncThunk(
    'patients/list',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await patientService.getPatients(token)
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

export const getPatient = createAsyncThunk(
    'patients/show',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await patientService.getPatient(data, token)
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
export const setPatient = createAsyncThunk(
    'patients/create',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await patientService.setPatient(data, token)
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
export const getTypePatients = createAsyncThunk(
    'patients/type',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await patientService.getTypePatients(token)
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
export const editPatient = createAsyncThunk(
    'patients/edit',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await patientService.editPatient(data, token)
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
export const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isCreateLoading = false
            state.isCreateSuccess = false
            state.isCreateError = false

            state.isSearchLoading = false
            state.isSearchSuccess = false
            state.isSearchError = false

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
            .addCase(getPatients.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPatients.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.patients = action.payload
            })
            .addCase(getPatients.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.patients = null
            })

            .addCase(getPatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.patient = action.payload
            })
            .addCase(getPatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.patient = null
            })

            .addCase(getTypePatients.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTypePatients.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.type_patient = action.payload
            })
            .addCase(getTypePatients.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.type_patient = null
            })

            .addCase(setPatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setPatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.type_patient = action.payload
            })
            .addCase(setPatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.type_patient = null
            })

            .addCase(editPatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editPatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.type_patient = action.payload
            })
            .addCase(editPatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.type_patient = null
            })
    }
})

export const { reset } = patientSlice.actions
export default patientSlice.reducer