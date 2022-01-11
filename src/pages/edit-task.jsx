import axios from 'axios';
import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { ifEmptyTaskFileds } from "../functions";


export const EditTaskPage = () => {
    //COMPONENT'S STATE
    const [taskData, setTaskData] = useState()
    const [disabledButton, setDisabledButton] = useState(true)
    const [userRole, setUserRole] = useState({role:"Not a customer", userID:"---"})
    const pathID = useLocation().pathname.split('/')[2]
    const taskID = useLocation().pathname.split('/')[4]
    //USENAVIGATE TO NAVIGAE THROUGH PAGES
    const history = useNavigate();

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

    //GETS USER INFO AND SETS TASK TO STATE BASSED ON PATH
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${pathID}`)
            .then(res =>
                res.data.user.toDoList.forEach(item=>{
                    item._id == taskID && setTaskData(item)
                })
                    )
            .catch(err=>console.log(err));
    },[pathID])

    //SETS COMPLETION DATE, TO TASK, IF TASK IS DONE
    const ifIsComleted = (task_status) => {
        if (task_status) {
            const day = new Date().getDate()
            const month = new Date().getMonth()
            const year = new Date().getFullYear()
            return `${day}/${month}/${year}`
        }else{
            return "--/--/--"
        }
    }

    //REQUEST TO UPDATE USER TASK
    const updateNote = (e) => {
        e.preventDefault()

        const updateTaskPatch = {
            title:ifEmptyTaskFileds(e.target[0].value, "title"),
            description:ifEmptyTaskFileds(e.target[1].value),
            completed:e.target[2].checked,
            completionDate:ifIsComleted(e.target[2].checked)
        }

        axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/task/${pathID}?taskID=${taskID}`, updateTaskPatch)
            .then(res => alert("Task successfully updated!"), setDisabledButton(true))
            .catch(err=>console.log(err));
    }

    //JSX
    return (
        <section>
            <button className="back-button submit-button" onClick={()=>history(-1)}>Back</button>
            {
                //IF USER ID MATCHES, ACCESS TO PAGE ALLOWED 
                pathID === userRole.userID ? (
                    <section className="white-container">
                        {
                            taskData && (
                                <>
                                    <form onSubmit={updateNote} className="edit-task-form" action="">
                                        <label htmlFor="">Change task title: </label>
                                        <input maxLength="40" onChange={()=>{setDisabledButton(false)}} type="text" placeholder="Title" defaultValue={taskData.title}/>
                                        <label htmlFor="">Change task description: </label>
                                        <textarea onChange={()=>{setDisabledButton(false)}} defaultValue={taskData.description} rows="5"></textarea>
                                        <label>Done: <input onChange={()=>{setDisabledButton(false)}} type="checkbox" defaultChecked={taskData.completed}/></label>
                                        <button disabled={disabledButton} className={ disabledButton ? "disabled-button" : "submit-button"}>Update</button>
                                    </form>
                                </>                                
                            )
                        }
                    </section>
                ):(<h1 className="warning-message">You're not allowed to enter this page</h1>)
            }
        </section>)
}