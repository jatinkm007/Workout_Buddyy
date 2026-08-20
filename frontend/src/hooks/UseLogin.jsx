import { useState } from "react";
import { useAuthContext } from "./UserAuthContext";


export const useLogin = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext()

    const login = async (email , password) =>{
        setIsLoading(true)
        setError(null)

        const response =  await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`,{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({email,password})
        })

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))


            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }

    }

    return{login, isLoading, error}
}

