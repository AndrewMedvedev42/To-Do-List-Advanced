import {useLocation} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';

export const AdminUserInfo = () => {
    const [userData, setUserData] = useState()

    const pathID = useLocation().pathname.split('/')[3]

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${pathID}`)
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
                                    userData.toDoList.map(item=>{
                                        return (
                                            <article className="white-container">
                                                <h2 className={item.completed ? "crossed":""}>{item.title}</h2>
                                                {item.completed ? (<span>Completed: {item.completionDate}</span>)
                                                :""}
                                            </article>   
                                        )
                                    })
                                ) : <h2>No notes yet</h2>
                            }         
                        </section> 
                    </>
                )
            }
        </section>   
    )
}