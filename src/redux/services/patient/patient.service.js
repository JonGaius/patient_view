import axios from "axios"
import {API_URL} from "../../utils";

const getPatients = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + "patients"  , config)
    console.log(response)
    return response.data
}

const getTypePatients = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + "type_patients"  , config)

    return response.data.data
}

const getPatient = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + "patients/" + data  , config)
    console.log(response)
    return response.data
}
const setPatient = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL + "patients", data  , config)
    console.log(response)
    return response.data
}

const editPatient = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.patch(API_URL + `patients/${data.id}/edit`,data.content  , config)
    console.log(response)
    return response.data
}

const patientService = {
    getPatients,
    getPatient,
    setPatient,
    editPatient,
    getTypePatients
}

export default patientService