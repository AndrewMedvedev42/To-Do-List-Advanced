import axios from 'axios';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";

export const LoginRegisterPage = () => {
    const history = useNavigate();

    const [userFirstName, setUserFirstName] = useState(null)
    const [userLastName, setUserLastName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPassword, setUserPassword] = useState(null)

    const [adminEmail, setAdminEmail] = useState(null)
    const [adminPassword, setAdminPassword] = useState(null)
    const [adminTokken, setAdminTokken] = useState(null)

    const AdminPass = () => {
        if (adminEmail === "admin.email@gmail.com" && adminPassword === "hapu56!rewq" && adminTokken === "GYdy4haisWYYTv5RYct4"){
            history("/admin");
        }else{
            console.log("You're not an admin");
        }
    }

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
                <form className="white-container" action="">
                    <h1>Log in</h1>
                    <input placeholder="Email"/>
                    <input placeholder="Password"/>
                    <button className="submit-button">Log in</button>
                </form>
                <form className="white-container" onSubmit={SendPostRequest}>
                    <h1>Register</h1>
                    <input placeholder="First name" onChange={(e)=>{setUserFirstName(e.target.value)}}/>
                    <input placeholder="Last name" onChange={(e)=>{setUserLastName(e.target.value)}}/>
                    <input placeholder="Email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
                    <input placeholder="Password" onChange={(e)=>{setUserPassword(e.target.value)}}/>
                    <button className="submit-button">Register</button>
                </form>
                <form className="white-container">
                    <h1>Log in as an Admin</h1>
                    <input placeholder="Email" onChange={(e)=>{setAdminEmail(e.target.value)}}/>
                    <input placeholder="Password" onChange={(e)=>{setAdminPassword(e.target.value)}}/>
                    <input placeholder="Admin Key" onChange={(e)=>{setAdminTokken(e.target.value)}}/>
                    <button className="submit-button" onClick={AdminPass}>Log in as an Admin</button>
                </form>
            </section>
        </section>)
}