import axios from "axios";
import React, { useState } from "react";

export default function Login() { 

    const [client, setClient] = useState({
        email: '',
        password: '',
        access :'',
        error: []
    }) 
    function handleData(e){
        setClient((formData)=>({
            ...formData,
            [e.target.name] : e.target.value
        }))
    }
    function sendData(e){
        e.preventDefault()
        const dataForm ={
            email : client.email,
            password : client.password,
            password_confirmation : client.password_confirmation,
            message : client.message
        }
        axios.post('http://127.0.0.1:8000/api/login-client', dataForm).then((response) => {
            console.log(response.data.dataToken);
            localStorage.setItem("token", response.data.dataToken.token)
        });
        console.log(localStorage.getItem("token"))
    }
return(
    <div>
        <form onSubmit={sendData}>
                <div class="mb-3">
                    <label htmlFor="email" class="form-label">Email address</label>
                    <input
                        type="email"
                        name='email'
                        class="form-control"
                        id="email"
                        placeholder="name@example.com"
                        onChange={handleData}
                        value={client.email}
                    />
                </div>
                <div className="text-danger">{client.error.email}</div>
                <div class="mb-3">
                    <label htmlFor="pass" class="form-label">password</label>
                    <input
                        type="password"
                        class="form-control"
                        id="pass"
                        name="password"
                        onChange={handleData}
                        value={client.password}
                    />
                </div>
                <button type="submit">submit</button>
            </form>
    </div>
)

}