import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../services/auth/auth.slice'
import rdvReducer from '../services/rdv/rdv.slice'
import patientReducer from '../services/patient/patient.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        rdv: rdvReducer,
        patient: patientReducer,
    }
})