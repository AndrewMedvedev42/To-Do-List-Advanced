import {useLocation} from "react-router-dom"
import { useEffect, useState } from "react"
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios';
import {Link} from "react-router-dom";
import { ifEmptyTaskFileds } from "../functions";

//USER PAGE
export const UserPage = () => {
    const [count, setCount] = useState(0)
    const [userData, setUserData] = useState(null)
    const [userTaskList, setUserTaskList] = useState([])
    const [userRole, setUserRole] = useState({role:"Not a customer", userID:"---"})
    const pathID = useLocation().pathname.split('/')[2]
    const iconSize = 64



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

    const distributeData = (res) => {
        const {user} = res.data
        setUserData(user)
        setUserTaskList(user.toDoList)
    }

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${pathID}`)
            .then(res=>distributeData(res))
            .catch(err=> alert("Sorry, account was not found."));
    },[count, pathID])

    const removeTaskFromList = (i) => {
        let rostedTaskList = userTaskList.filter((item) => item._id !== i)
        setUserTaskList(rostedTaskList);
    }

    const submitTask = (e, item_id) => {
        e.preventDefault();

        const taskInfo = {
            title:ifEmptyTaskFileds(e.target[0].value, "title"),
            description:ifEmptyTaskFileds(e.target[1].value)
        }
            //IF POST IS SUCCESSFUL, ALSO TRIGGERS count STATE RE-REQUEST DATA OF USER
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/task/${item_id}`, taskInfo)
        .then(res => setCount(count+1)).catch(err=>alert("Not able to send a task"));
    }
            //DELETES TASK FROM DATABASE AND REMOVES TASK FROM userTaskList
    const deleteTask = (user_id, task_id) => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/task/${user_id}?taskID=${task_id}`)
        .then(res => removeTaskFromList(task_id)).catch(err=>alert("Not able to delete a task"));
    }
            //JSX CODE
    return (
        <section className="user-page">
            {
                //RENDERS USER INFO IF USERS INFO ACHIVED
                userData ? (
                        userRole.role === userData.role && userRole.userID === userData._id ? (
                            <>
                            <section className="user-details-container">
                                <FaUserAlt size={iconSize}/>
                                <h1 className="user-name">{userData.firstName} {userData.lastName}</h1>
                                <span className="user-email">{userData.email}</span>
                                <span className="user-id">UID: {userData._id}</span>
                                <Link to={`/users/${userData._id}/user-details`}>
                                    <button className="submit-button">Edit Deatils</button>
                                </Link>
                            </section>
            
                            <section className="create-task-section">
                                <form onSubmit={(e)=>{(submitTask(e, userData._id))}} className="white-container form" action="">
                                    <h2>Create task</h2>
                                    <input maxLength={40} placeholder="Title" />
                                    <textarea placeholder="Description" name="" id="" cols={30} rows={10}></textarea>
                                    <button className="submit-button">Create</button>
                                </form>
                            <section className="task-list">
                                {
                                    //RENDERS THE TASK LIST IF LIST NOT EMPTY
                                    userTaskList.length ? (
                                        userTaskList.map((item)=>{
                                            return (
                                                <article key={item._id} className="white-container">
                                                    <h2 className={`title ${item.completed ? "crossed":""}`}>{item.title}</h2>
                                                    <p className="task-description">{item.description}</p>
                                                    {item.completed ? (<span>Completed: {item.completionDate}</span>)
                                                    :""}
                                                    <div>
                                                        <Link to={`/users/${userData._id}/edit-task/${item._id}`}>
                                                            <button className="submit-button">Edit</button>
                                                        </Link>
                                                        <button onClick={()=>{deleteTask(userData._id, item._id)}} className="delete-button">Detele</button>
                                                    </div>
                                                </article>
                                            )
                                        })
                                    ):<h2 className="warning-message">No tasks added</h2>
                                }
                            </section>
                        </section>
                        </>
                        ) : <h1 className="warning-message">You're not allowed to enter this page</h1>
                ):<h1 className="warning-message">User not found</h1>
            }
        </section>)
}