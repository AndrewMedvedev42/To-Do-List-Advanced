import { useEffect, useState } from "react";
import axios from 'axios';
import {
    Link
  } from "react-router-dom";

export const AdminPage = () => {
    const [userList, setUserList] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/api/v1/admin')
        .then(res => setUserList(res.data.users));
    },[])

    console.log(userList)

    return (
        <section className="admin-page">
            <section>
                {
                    userList.length ? (      
                        userList.map(item=>{
                            return (
                                <Link to="/admin/console/user/42">
                                <article className="white-container">
                                    <img src="#" alt="user-img" />
                                    <h1>{item.firstName} {item.lastName}</h1>
                                    <span>User ID:{item._id}</span>
                                    <form action="">
                                        <label htmlFor="">Active user</label>
                                        <input type="checkbox" />
                                        <button>Update</button>
                                    </form>
                                    <button>Delete</button>
                                </article>
                            </Link>
                            )
                        })): (<h1>No users found yet!</h1>)
                }
            </section>
        </section>)
}