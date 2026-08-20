import { useState } from "react";
import { useLogin } from "../hooks/UseLogin";
import { div } from "framer-motion/client";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }


    return (
        <form className="login" onSubmit={handleSubmit}>
            <h4>LogIn </h4>

            <label htmlFor="">Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />


            <label htmlFor="">Password:</label>
            <input type="passsword" onChange={(e) => setPassword(e.target.value)} value={password} />

            <button disabled={isLoading}>LogIn</button>

            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default Login