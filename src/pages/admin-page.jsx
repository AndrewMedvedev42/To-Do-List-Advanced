import { useEffect, useState } from "react";
import axios from 'axios';
import {
    Link
  } from "react-router-dom";

export const AdminPage = () => {
        const [counter, setCounter] = useState(0)
        const [userList, setUserList] = useState([])

        useEffect(()=>{
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/admin`)
            .then(res => setUserList(res.data.users)).catch(err=>console.log(err));
        },[counter])

        const deleteUserAccount = (user_id) => {
             axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${user_id}`)
                .then((res) => {
                    setCounter(counter+1)
                })
        }

        const updateUserAccount = (e, user_id) => {
            var checkboxStatus = e.target.checked;
            axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${user_id}`, {"activeAccount":checkboxStatus})
               .then((res) => {
                   console.log(res.status)
               })
       }

    return (
        <section className="admin-page">
            <section>
                {
                    userList.length ? (      
                        userList.map(item=>{
                            return (
                                <article className="white-container">
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png" alt="user-img" />
                                    <h1>{item.firstName} {item.lastName}</h1>
                                    <span>User ID:{item._id}</span>
                                    <form>
                                    <label htmlFor="">Active user:</label>
                                    <input type="checkbox" onChange={(e)=>{updateUserAccount(e, item._id)}} defaultChecked={item.activeAccount}/>
                                    </form>                                        
                                
                                    <button onClick={()=>{deleteUserAccount(item._id)}} className="submit-button">Delete</button>
                                    <Link to={`/admin/user/${item._id}`}>
                                        <button>Notes: {item.toDoList.length}</button>
                                    </Link>
                                </article>
                            )
                        })): (<h1>No users found yet!</h1>)
                }
            </section>
        </section>)
}