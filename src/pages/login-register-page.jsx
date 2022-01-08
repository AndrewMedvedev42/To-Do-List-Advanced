import axios from 'axios';
import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

export const LoginRegisterPage = () => {
    return (
        <section className="login-register-page">
            <section className="forms-container">
                <LoginSection/>
                <RegisterSection/>
                <AdminLogin/>
            </section>
        </section>)
}

const LoginSection = () => {
    const history = useNavigate();

    const [userLoginEmail, setUserLoginEmail] = useState(null)
    const [userLoginPassword, setUserLoginPassword] = useState(null)

    const mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const userCheckProcces = (data) => {
        const {password, activeAccount, _id} = data.data.user
            if (userLoginPassword === password) {
                if (activeAccount === true) {
                    history(`/users/${_id}`)
                } else {
                    alert("Sorry, your account is inactive!")
                }
            }else{
                alert("wrong password")
            }
    }

    const getUserDataByLogin = () => {
        if (userLoginEmail.match(mailValidation)) {
            axios
                .get(`http://localhost:5000/api/v1/login_register?email=${userLoginEmail}`)
                .then(res => {
                    userCheckProcces(res)
                })
                .catch(err => {
                    alert("Account with this email doesn't exist")
                })
        } else {
            alert("Email is typed incorrectly")
        }
    } 
    return (
        <div className="white-container form" action="">
            <h1>Log in</h1>
            <input placeholder="Email" onChange={(e)=>{setUserLoginEmail(e.target.value)}} required/>
            <input placeholder="Password" onChange={(e)=>{setUserLoginPassword(e.target.value)}} required/>
            <button className="submit-button" onClick={getUserDataByLogin}>Log in</button>
        </div>
    )
}

const RegisterSection = () => {
    const [userFirstName, setUserFirstName] = useState(null)
    const [userLastName, setUserLastName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPassword, setUserPassword] = useState(null)

    const mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const getUserData = () => {
        if (userEmail.match(mailValidation)) {
            axios
                .get(`http://localhost:5000/api/v1/login_register?email=${userEmail}`)
                .then(res => alert("Sorry, this email already exists."))
                .catch(err => {
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
                    alert("Successfull register");
                })
                .catch(err => {
                    console.log(err);
                });
            
                })
        } else {
            alert("Email is typed incorrectly")
        }
    } 
    
    return (
        <div className="white-container form">
            <h1>Register</h1>
            <input placeholder="First name" onChange={(e)=>{setUserFirstName(e.target.value)}} required/>
            <input placeholder="Last name" onChange={(e)=>{setUserLastName(e.target.value)}} required/>
            <input placeholder="Email" type="emailitem_id" onChange={(e)=>{setUserEmail(e.target.value)}} required/>
            <input placeholder="Password" onChange={(e)=>{setUserPassword(e.target.value)}} required/>
            <button className="submit-button" onClick={getUserData}>Register</button>
        </div>
    )
}

const AdminLogin = () => {
    const [adminEmail, setAdminEmail] = useState(null)
    const [adminPassword, setAdminPassword] = useState(null)
    const [adminTokken, setAdminTokken] = useState(null)

    const mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const history = useNavigate();

    const AdminPass = () => {
        if (adminEmail.match(mailValidation)) {
            if (adminEmail === "admin.email@gmail.com" && adminPassword === "hapu56!rewq" && adminTokken === "GYdy4haisWYYTv5RYct4"){
                history("/admin");
            }else{
                alert("You're not an admin");
            }
        }else{
            alert("Email is typed incorrectly")
        }
    }
    
    return (
        <div className="white-container form">
            <h1>Log in as Admin</h1>
            <input placeholder="Email" onChange={(e)=>{setAdminEmail(e.target.value)}} required/>
            <input placeholder="Password" onChange={(e)=>{setAdminPassword(e.target.value)}} required/>
            <input placeholder="Admin Key" onChange={(e)=>{setAdminTokken(e.target.value)}} required/>
            <button className="submit-button" onClick={AdminPass}>Log in as an Admin</button>
        </div>
    )
}