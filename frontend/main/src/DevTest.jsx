import axios from 'axios'
import React, { useState } from 'react'

export default function DevTest() {

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = async () => {
        await axios.post('https://retro-bazaar-production.up.railway.app/authapi/local/login',{

            email: email,
            password: password
        }).then( (res) => {
            console.log(res)
        axios.get('https://retro-bazaar-production.up.railway.app/api/getUserInfo').then((res) => console.log(res))
        })
        // console.log(sessionStorage)

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
