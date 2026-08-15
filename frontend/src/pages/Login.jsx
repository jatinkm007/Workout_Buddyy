import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()


    }


    return (
        <form className="login" onSubmit={handleSubmit}>
            <h4>LogIn </h4>

            <label htmlFor="">Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />


            <label htmlFor="">Password:</label>
            <input type="passsword" onChange={(e) => setEmail(e.target.value)} value={password} />

            <button>LogIn</button>

        </form>
    )
}

export default Login