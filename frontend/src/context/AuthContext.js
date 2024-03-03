import {createContext, useState, useEffect} from "react";
import { jwtDecode as jwt_decode} from 'jwt-decode';
import {useHistory} from "react-router-dom";

const swal = require('sweetalert2')

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );


    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/jwt/token/", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await response.json()

        localStorage.setItem("loginDetails", JSON.stringify(data))

        if(response.status === 200){
            console.log("Logged In");
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            history.push("/")
            swal.fire({
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })

        } else {    
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "Username or password does not exists",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const registerUser = async (first_name, last_name, email, username, mobile, password) => {

        const response = await fetch("http://127.0.0.1:8000/registration/", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                first_name, last_name, email, username, mobile, password
            })
        })

        
        if(response.status === 201){
            history.push("/pet")
            swal.fire({
                title: "Enter your pet credentials.",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {

            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    
    const PetInfo = async (petName, petType, age, height, weight) => {
        const response = await fetch("http://127.0.0.1:8000/pet/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                petName, petType, age, height, weight
            })
        })
        if(response.status === 201){
            history.push("/login")
            swal.fire({
                title: "",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }


    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        history.push("/login")
        swal.fire({
            title: "YOu have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }


    
    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        // role, // Include role in context
        // setRole, // Function to set role
        registerUser,
        PetInfo,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}

export default AuthContext;