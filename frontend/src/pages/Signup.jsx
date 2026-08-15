import { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()


    }


    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h4>Sign-Up </h4>

            <label htmlFor="">Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />


            <label htmlFor="">Password:</label>
            <input type="passsword" onChange={(e) => setEmail(e.target.value)} value={password} />

            <button>Sign Up</button>

        </form>
    )
}

export default Signup