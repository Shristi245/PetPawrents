import axios from "axios"
import { jwtDecode as jwt_decode } from 'jwt-decode';
import dayjs from "dayjs"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"


const userUrl = process.env.BASE_URL+"user";

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        userUrl,
        headers: {Authorization: `Bearer ${authTokens?.access}`}
    }).access

    axiosInstance.interceptors.request.use(async req => {
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        if (isExpired) return req

        const response = await axios.post(`${userUrl}/token/refresh/`, {
            refresh: authTokens.refresh
        })
        localStorage.setItem("authToken", JSON.stringify(response.data))
        localStorage.setItem("authToken", JSON.stringify(response.data))

        setAuthTokens(response.data)

        setUser(jwt_decode(response.data.access))

        req.headets.Authorization = `Bearer ${response.data.access}`
        return req
    });

    return axiosInstance
};

export default useAxios;
