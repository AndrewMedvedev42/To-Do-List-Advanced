import axios from 'axios';
import { useEffect, useState } from "react";
import {
    Link
  } from "react-router-dom";

export const AdminPage = () => {

        const [userRole, setUserRole] = useState({role:"Not an Admin"})
        const [counter, setCounter] = useState(0)
        const [userList, setUserList] = useState([])

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

        useEffect(()=>{
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/admin`)
            .then(res => setUserList(res.data.users)).catch(err=>console.log(err));
        },[counter])

        const deleteUserAccount = (user_id) => {
             axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${user_id}`)
                .then((res) => {
                    setCounter(counter+1)
                }).catch(err=>console.log(err))
        }

        const updateUserAccount = (e, user_id) => {
            var checkboxStatus = e.target.checked;
            axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${user_id}`, {"activeAccount":checkboxStatus})
               .then((res) => {
                   console.log(res.status)
               }).catch(err=>console.log(err))
       }

    return (
        <section className="admin-page">
            {
                userRole.role === "ADMIN" ? (
                    <section>
                    {
                        userList.length ? (      
                            userList.map(item=>{
                                return (
                                    <article className="white-container user-info-card">
                                        <img src="https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png" alt="user-img" />
                                            <h1>{item.firstName} {item.lastName}</h1>
                                            <span>UID:{item._id}</span>
                                            <form>
                                            <label htmlFor="">Active user:</label>
                                            <input type="checkbox" onChange={(e)=>{updateUserAccount(e, item._id)}} defaultChecked={item.activeAccount}/>
                                            </form>                                        
                                            <div>
                                                <button onClick={()=>{deleteUserAccount(item._id)}} className="submit-button">Delete</button>
                                                <Link to={`/admin/user/${item._id}`}>
                                                    <button>Notes: {item.toDoList.length}</button>
                                                </Link>
                                            </div>
                                    </article>
                                )
                            })): (<h1>No users found</h1>)
                    }
                </section>
                ) : (<h1 className="warning-message">You CAN'T visit this page, because you're not an admin</h1>)
            }
        </section>)
}