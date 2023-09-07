import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import { mailValidation, passwordValidation } from "../constants";

//BASE COMPONENT OF THE PAGE
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

//LOGIN FROM COMPONENT
const LoginSection = () => {
    const [userLoginEmail, setUserLoginEmail] = useState("")
    const [userLoginPassword, setUserLoginPassword] = useState("")

    useEffect(()=>{
        window.sessionStorage.setItem("M0NTY3ODkw", JSON.stringify({role:"Customer"}));
      },[])

    const history = useNavigate();

    const userCheckProcces = (data) => {
        const {password, activeAccount, _id} = data.data.user
            if (userLoginPassword === password) {
                if (activeAccount === true) {
                    window.sessionStorage.setItem("M0NTY3ODkw", JSON.stringify({role:"Customer", userID:_id}));
                    history(`/users/${_id}`)
                } else {
                    alert("Sorry, your account is inactive!")
                }
            }else{
                alert("Wrong password, please try again.")
            }
    }

    const getUserDataByLogin = (e) => {
        e.preventDefault();
        if (userLoginEmail.match(mailValidation)) {
            if (userLoginPassword.match(passwordValidation)) {
                axios
                    .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/login_register?email=${userLoginEmail}`)
                    .then(res => {
                        userCheckProcces(res)
                    })
                    .catch(err => {
                        alert("Sorry, user was not found")
                    })
            }else{
                alert("Password is typed incorrectly, please try again.")
            }
        } else {
            alert("Email is typed incorrectly, please try again.")
        }
    } 
        //COMPONET'S JSX
    return (
        <form onSubmit={getUserDataByLogin} className="white-container form" action="">
            <h1>Log in</h1>
            <input placeholder="Email" onChange={(e)=>{setUserLoginEmail(e.target.value)}} required/>
            <input placeholder="Password" onChange={(e)=>{setUserLoginPassword(e.target.value)}} required/>
            <button className="submit-button">Log in</button>
        </form>
    )
}

//COMPONENT FOR REGISTER OF USER 
const RegisterSection = () => {
    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const startRegisterProcess = (e) => {
        e.preventDefault();
        const ifEmptyUserData = (i, content_type) => {
                if (!Boolean(i) && !isNaN(i)) {
                    return "--"
                }else{
                    return i
                }
        }
        //FINDS IF EMAIL ALREADY EXISTS AND CHECKS IF TYPED EMAIL OR PASSWORD CAN BE USED AS REAL EMAIL OR PASSWORD
        if (userEmail.match(emailValidation)) {
            if(userPassword.match(passwordValidation)){
                    axios
                    .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/login_register?email=${userEmail}`)
                    .then(res => alert("Sorry, account with this email already exists."))
                    .catch(err => {
                        //IF EMAIL NOT FOUND, CREATES NEW USER ACCOUNT
                        const bodyData = {
                            firstName:ifEmptyUserData(userFirstName),
                            lastName:ifEmptyUserData(userLastName),
                            email:userEmail,
                            password:userPassword,
                            toDoList:[]
                        }
                        //POSTS NEW USER INFO INTO DATABASE
                        console.log(bodyData);
                        axios
                            .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login_register`, bodyData)
                            .then(res => {
                                alert("Account successfully registered. Please proceed to the Login section");
                            })
                            .catch(err => {
                                alert("Please, type your details correctly")
                            });
                })
            }else{
                alert("Password is typed incorrectly, please try again.")
            }
        } else {
            alert("Email is typed incorrectly, please try again.")
        }
    } 
        //COMPONET'S JSX
    return (
        <form onSubmit={startRegisterProcess} className="white-container form">
            <h1>Register an account</h1>
                <input maxLength="40" placeholder="First name" onChange={(e)=>{setUserFirstName(e.target.value)}} required/>
                <input maxLength="40" placeholder="Last name" onChange={(e)=>{setUserLastName(e.target.value)}} required/>
                <input maxLength="20" placeholder="Email" type="emailitem_id" onChange={(e)=>{setUserEmail(e.target.value)}} required/>
                <input maxLength="20" placeholder="Password" onChange={(e)=>{setUserPassword(e.target.value)}} required/>
            <button className="submit-button">Register</button>
        </form>
    )
}

//LOGIN  COMPONENT FOR ADMIN
const AdminLogin = () => {
        //COMPONENT'S STATES
    const [adminEmail, setAdminEmail] = useState(null)
    const [adminPassword, setAdminPassword] = useState(null)
    const [adminToken, setAdminToken] = useState(null)
        //USE NAVIGATE TO MOVE BETWEEN PAGES
    const history = useNavigate();
        //PROCESS TO CHECK FOR CORRECT ADMIN CREDENTIALS
    const AdminPass = (e) => {
        e.preventDefault();
            if (adminEmail === process.env.REACT_APP_ADMIN_EMAIL){
                if (adminPassword === process.env.REACT_APP_ADMIN_PASSWORD) {
                    if (adminToken === process.env.REACT_APP_ADMIN_TOKEN) {
                        window.sessionStorage.setItem("M0NTY3ODkw", JSON.stringify({role:"ADMIN"}));
                        history("/admin");
                    } else {
                        alert("Incorrect token, please try again.");
                    }
                } else {
                    alert("Incorrect password, please try again.");
                }
            }else{
                alert("Incorrect email, please try again.");
            }
    }
        //COMPONENT'S JSX
    return (
        <form onSubmit={AdminPass} className="white-container form">
            <h1>Log in as Admin</h1>
            <input  placeholder="Email" onChange={(e)=>{setAdminEmail(e.target.value)}} required/>
            <input placeholder="Password" onChange={(e)=>{setAdminPassword(e.target.value)}} required/>
            <input placeholder="Admin Key" onChange={(e)=>{setAdminToken(e.target.value)}} required/>
            <button className="submit-button">Log in as an Admin</button>
        </form>
    )
}