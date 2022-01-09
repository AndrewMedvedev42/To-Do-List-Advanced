import {useLocation} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';
import {Link} from "react-router-dom";
export const UserPage = () => {
    const [count, setCount] = useState(0)
    const [userData, setUserData] = useState(null)
    const [userTaskList, setUserTaskList] = useState([])
    const pathID = useLocation().pathname.split('/')[2]

    console.log(pathID);

    const distributeData = (res) => {
        const {user} = res.data
        setUserData(user)
        setUserTaskList(user.toDoList)
    }

    const removeTaskFromList = (i) => {
        let rostedTaskList = userTaskList.filter((item) => item._id !== i)
        setUserTaskList(rostedTaskList);
    }

    useEffect(()=>{
        console.log(pathID);
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${pathID}`)
            .then(res=>distributeData(res))
            .catch(err=> alert("Account not found"));
    },[count])

    const submitTask = (e, item_id) => {
        e.preventDefault();
        const ifEmpty = (i) => {
            if (!isNaN(i)) {
                return "Task title"
            }else{
                return i
            }
        }

        const taskInfo = {
            title:ifEmpty(e.target[0].value),
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/task/${item_id}`, taskInfo)
        .then(res => setCount(count+1)).catch(err=>console.log(err));
    }

    const deleteTask = (user_id, task_id) => {
        removeTaskFromList(task_id)
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/task/${user_id}?taskID=${task_id}`)
        .then(res => removeTaskFromList(task_id)).catch(err=>console.log(err));
    }

    return (
        <section className="user-page">
            {
                userData ? (
                    <>
                    <section className="user-details-container">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png" alt="user-img" />
                    <h1 className="user-name">{userData.firstName} {userData.lastName}</h1>
                    <span className="user-id">User ID: {userData._id}</span>
                    <Link to={`/users/${userData._id}/user-details`}>
                        <button className="submit-button">Edit Deatils</button>
                    </Link>
                </section>
    
                <section className="to-do-section">
                    <form onSubmit={(e)=>{(submitTask(e, userData._id))}} className="white-container form" action="">
                        <h2>Create to do</h2>
                        <input placeholder="Title" />
                        <button className="submit-button">Create</button>
                    </form>
    
                    <section className="to-do-list">
                        {
                            userTaskList.length ? (
                                userTaskList.map(item=>{
                                    return (
                                        <article key={item._id} className="white-container">
                                            <h2 className={item.completed ? "crossed":""}>{item.title}</h2>
                                            {item.completed ? (<span>Completed: {item.completionDate}</span>)
                                            :""}
                                            <div>
                                            <Link to={`/users/${userData._id}/edit-task/${item._id}`}>
                                                <button className="submit-button">Edit</button>
                                            </Link>
                                                <button onClick={()=>{deleteTask(userData._id, item._id)}} className="submit-button">Detele</button>
                                            </div>
                                        </article>
                                    )
                                })
                            ):<span>No tasks added</span>
                        }
                    </section>
                </section>
                </>
                ):<h1 style={{textAlign:"center"}}>User not found</h1>
            }
        </section>)
}