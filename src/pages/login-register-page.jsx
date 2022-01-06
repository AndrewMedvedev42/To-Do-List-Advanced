import axios from 'axios';
import { useState } from 'react';

export const LoginRegisterPage = () => {

    const [userFirstName, setUserFirstName] = useState(null)
    const [userLastName, setUserLastName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPassword, setUserPassword] = useState(null)

    console.log(userFirstName, userLastName, userEmail, userPassword)

    const SendPostRequest = (e) => {
        e.preventDefault()
        const bodyData = {
            firstName:userFirstName,
            lastName:userLastName,
            email:userEmail,
            password:userPassword,
            activeAccount:true,
            isNewUser:true,
            toDoList:[]
        }

            axios
            .post('http://localhost:5000/api/v1/login_register', bodyData)
            .then(res => {
                console.log("Successfull");
            })
            .catch(err => {
                console.log(err);
            });
            
    }

    return (
        <section className="login-register-page">
            <section className="forms-container">
                <form action="">
                    <h1>Log in</h1>
                    <input placeholder="Email"/>
                    <input placeholder="Password"/>
                    <button className="submit-button">Log in</button>
                </form>
                <form onSubmit={SendPostRequest}>
                    <h1>Register</h1>
                    <input placeholder="First name" onChange={(e)=>{setUserFirstName(e.target.value)}}/>
                    <input placeholder="Last name" onChange={(e)=>{setUserLastName(e.target.value)}}/>
                    <input placeholder="Email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
                    <input placeholder="Password" onChange={(e)=>{setUserPassword(e.target.value)}}/>
                    <button className="submit-button">Register</button>
                </form>
                <form action="">
                    <h1>Log in as an Admin</h1>
                    <input placeholder="Email"/>
                    <input placeholder="Password"/>
                    <input placeholder="Admin Key"/>
                    <button className="submit-button">Log in as an Admin</button>
                </form>
            </section>
        </section>)
}