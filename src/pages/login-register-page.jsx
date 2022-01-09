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
    const mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [userLoginEmail, setUserLoginEmail] = useState(null)
    const [userLoginPassword, setUserLoginPassword] = useState(null)

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

    const getUserDataByLogin = (e) => {
        e.preventDefault();

        if (userLoginEmail.match(mailValidation)) {
            axios
                .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/login_register?email=${userLoginEmail}`)
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
        <form onSubmit={getUserDataByLogin} className="white-container form" action="">
            <h1>Log in</h1>
            <input placeholder="Email" onChange={(e)=>{setUserLoginEmail(e.target.value)}} required/>
            <input placeholder="Password" onChange={(e)=>{setUserLoginPassword(e.target.value)}} required/>
            <button className="submit-button">Log in</button>
        </form>
    )
}

const RegisterSection = () => {
    const [userFirstName, setUserFirstName] = useState(null)
    const [userLastName, setUserLastName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPassword, setUserPassword] = useState(null)

    const mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const startRegisterProcess = (e) => {
        e.preventDefault();
        if (userEmail.match(mailValidation)) {
            axios
                .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/login_register?email=${userEmail}`)
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
                .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login_register`, bodyData)
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
        <form onSubmit={startRegisterProcess} className="white-container form">
            <h1>Register</h1>
            <input placeholder="First name" onChange={(e)=>{setUserFirstName(e.target.value)}} required/>
            <input placeholder="Last name" onChange={(e)=>{setUserLastName(e.target.value)}} required/>
            <input placeholder="Email" type="emailitem_id" onChange={(e)=>{setUserEmail(e.target.value)}} required/>
            <input placeholder="Password" onChange={(e)=>{setUserPassword(e.target.value)}} required/>
            <button className="submit-button">Register</button>
        </form>
    )
}

const AdminLogin = () => {
    const [adminEmail, setAdminEmail] = useState(null)
    const [adminPassword, setAdminPassword] = useState(null)
    const [adminTokken, setAdminTokken] = useState(null)

    const mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const history = useNavigate();

    const AdminPass = (e) => {
        e.preventDefault();
        if (adminEmail.match(mailValidation)) {
            if (adminEmail === process.env.REACT_APP_ADMIN_EMAIL){
                if (adminPassword === process.env.REACT_APP_ADMIN_PASSWORD) {
                    if (adminTokken === process.env.REACT_APP_ADMIN_TOKKEN) {
                        history("/admin");
                    } else {
                        alert("Sorry, incorrect tokken");
                    }
                } else {
                    alert("Sorry, incorrect password");
                }
            }else{
                alert("Sorry, incorrect email");
            }
        }else{
            alert("Email is typed incorrectly")
        }
    }
    
    return (
        <form onSubmit={AdminPass} className="white-container form">
            <h1>Log in as Admin</h1>
            <input placeholder="Email" onChange={(e)=>{setAdminEmail(e.target.value)}} required/>
            <input placeholder="Password" onChange={(e)=>{setAdminPassword(e.target.value)}} required/>
            <input placeholder="Admin Key" onChange={(e)=>{setAdminTokken(e.target.value)}} required/>
            <button className="submit-button">Log in as an Admin</button>
        </form>
    )
}