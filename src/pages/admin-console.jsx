import {useLocation} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';

export const AdminUserConsole = () => {
    const [userData, setUserData] = useState()

    const pathID = useLocation().pathname.split('/')[4]

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/admin/user/${pathID}`)
        .then(res => setUserData(res.data.user)).catch(err=>console.log(err));
    },[])

    return (
        <section className="admin-console-page">
            {
                userData && (
                    <>
                        <article className="white-container user-details">
                            <img src="https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png" alt="user-img" />
                            <h1>{userData.firstName} {userData.lastName}</h1>
                            <span>{userData._id}</span>
                        </article>    
                        <section className="user-todo-list">
                            {
                                userData.toDoList.length ? (
                                    <article className="white-container">
                                        <h2>To-Do title</h2>
                                        <p>To-Do text</p>
                                    </article>   
                                ) : <h2>No notes yet</h2>
                            }         
                        </section> 
                    </>
                )
            }
        </section>   
    )
}