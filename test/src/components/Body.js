import React, { useState } from "react";
import axios from "axios";

export default function Body() {
    const [client, setClient] = useState({
        email: '',
        password: '',
        message: '',
        password_confirmation :'',
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
        axios.post('http://127.0.0.1:8000/api/add-client', dataForm).then((response) => {
            if(response.data.etat === 400){
                console.log(response.data)
                setClient(errors => ({
                    ...errors,
                    error: response.data.message_errors,
                }))
            }
            
            
            // if (response.data.etat === 200) {
            //     setRegister({
            //         name: '',
            //         email: '',
            //         ice: '',
            //         registre: '',
            //         adress: '',
            //         country: '',
            //         city : '',
            //         password: '',
            //         password_confirmation: '',
            //         logo: '',
            //         scan: '',
            //         error: []
            //     })
            //     navigate('/login', {state: response.data.message})
            // } else if (response.data.status === 400) {
            //     setRegister(errors => ({
            //         ...errors,
            //         error: response.data.message_errors,
            //     }))
            // }
        });
        console.log(client.error.email)
    }
    return (
        <div className="container">
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
                <div class="mb-3">
                    <label htmlFor="conf" class="form-label">confirmaton</label>
                    <input
                        type="password"
                        class="form-control"
                        id="conf"
                        name="password_confirmation"
                        onChange={handleData}
                        value={client.password_confirmation}
                    />
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                    <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="message"
                        onChange={handleData}
                        value={client.message}
                        ></textarea>
                </div>
                <button type="submit">submit</button>
            </form>
            {client.message}
        </div>
    )
}