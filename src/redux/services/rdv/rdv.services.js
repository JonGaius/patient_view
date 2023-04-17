import axios from "axios"
import {API_URL} from "../../utils";

const getRdvs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + "rdvs"  , config)
    console.log(response)
    return response.data
}

const getRdv = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + "rdvs/" + data  , config)
    console.log(response)
    return response.data
}

const setRdv = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + "rdvs/", data  , config)
}

const editRdv = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.patch(API_URL + `rdvs/${data.id}/edit`,data.content  , config)
}

const rdvServices = {
    getRdvs,
    getRdv,
    setRdv,
    editRdv
}

export default rdvServices