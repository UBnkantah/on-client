import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../features/authSlice'
import "./Register.styles.css"
import { useNavigate } from 'react-router'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth);

    console.log(auth)

    useEffect(() => {
        if(auth._id){
            navigate("/cart")
        }
    }, [auth._id, navigate]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(registerUser(user))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-container'>
                <h2>Register</h2>
                <input type='text' placeholder='name' onChange={(e) => setUser({...user, name: e.target.value})}/>
                <input type='email' placeholder='email' onChange={(e) => setUser({...user, email: e.target.value})} />
                <input type='password' placeholder='password' onChange={(e) => setUser({...user, password: e.target.value})}/>
                <button type='submit'>
                    {auth.registerStatus === "pending" ? "Submitting" : "Register"}
                </button>

                {auth.registerStatus === "rejected" ? (<p>{auth.registerError}</p>) : null}
            </form>
        </div>
    )
}

export default Register