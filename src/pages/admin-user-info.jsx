import {useLocation} from "react-router-dom"
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react"
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios';

export const AdminUserInfo = () => {
    //COMPONENT'S STATE
    const [userRole, setUserRole] = useState({role:"Not an Admin"})
    const [userData, setUserData] = useState()
    const pathID = useLocation().pathname.split('/')[3]
    const history = useNavigate();
    const iconSize = 96

    //GETS USER ROLE DATA FORM SESSION STORAGE FOR VALIDATION
    useEffect(()=>{
        try {
            const roleInfo = JSON.parse(window.sessionStorage.getItem("M0NTY3ODkw"))
            if (roleInfo) {
                setUserRole(roleInfo)
            }
        } catch (error) {
            console.log(error);
        }
    },[])

    //REQUESTS CHOSEN USER ACCOUNT DATA
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${pathID}`)
        .then(res => setUserData(res.data.user)).catch(err=>alert("Sorry, user was not found"));
    },[pathID])

    //JSX
    return (
        <section className="admin-user-info-page">
            <button className="back-button submit-button" onClick={()=>history(-1)}>Back</button>
            {
                //IF USER ROLE MATCHES, ACCESS TO PAGE ALLOWED 
                userRole.role === "ADMIN" ? (
                    userData && (
                        <section className="container">
                            <article className="white-container user-details">
                                <FaUserAlt size={iconSize}/>
                                <h1 className="title">{userData.firstName} {userData.lastName}</h1>
                                <p><span>UID: </span>{userData._id}</p>
                                <p><span>User email: </span>{userData.email}</p>
                            </article>    
                            <section className="user-todo-list">
                                {
                                    userData.toDoList.length ? (
                                        userData.toDoList.map(item=>{
                                            return (
                                                <article className="white-container">
                                                    <h2 className={item.completed ? "crossed":""}>{item.title}</h2>
                                                    <p className="task-description">{item.description}</p>
                                                    {item.completed ? (<span>Completed: {item.completionDate}</span>)
                                                    :""}
                                                </article>   
                                            )
                                        })
                                    ) : <h2 className="warning-message">No tasks added</h2>
                                }         
                            </section> 
                        </section>
                    )
                ) : (<h1 className="warning-message">You CAN'T visit this page, because you're not an admin</h1>)
            }
        </section>   
    )
}