import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"

const baseURL = "http://127.0.0.1:8000/user"

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${authTokens?.access}`}
    }).access

    axiosInstance.interceptors.request.use(async req => {
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        if (isExpired) return req

        const response = await axios.post(`${baseURL}/token.refresh`)
        
    })
}
