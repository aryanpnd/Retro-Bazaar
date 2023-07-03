import axios from 'axios'
import React, { useState } from 'react'
import { apiURL } from './App'

export default function DevTest() {

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = async () => {
        await axios.post('http://localhost:8080/authapi/local/login',{
            email: email,
            password: password
        },{ withCredentials: true}).then( (res) => {
                axios.get('http://localhost:8080/api/getUserInfo',{withCredentials: true}).then((res) => console.log(res))
                console.log(res)
            })

    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setpassword(e.target.value)
    }

    return (
        <div>
            <input type="text" name='email' onChange={handleChangeEmail} />
            <input type="text" name='password' onChange={handleChangePassword} />
            <button onClick={handleSubmit}>login</button>
        </div>
    )
}
