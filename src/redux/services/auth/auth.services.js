import axios from "axios"
import {API_URL} from "../../utils";

const login = async (data) => {
    const response = await axios.post(API_URL + "login", data)

    if (response.data) {
        localStorage.setItem('auth-accompagnant', JSON.stringify(response.data.token))
        localStorage.setItem('auth-accompagnant-id', JSON.stringify(response.data.user.id))
    }
    return response.data.user
}
const getMe = async (data, token) => {
    const config = {
         headers: {
           Authorization: `Bearer ${token}`,
         },
    }

    const response = await axios.get(API_URL + `users/${data}/show`, config)

    return response.data.data
}

const logout = async () => {
    localStorage.removeItem('auth-accompagnant')
}

const authService = {
    login,
    logout,
    getMe
}

export default authService