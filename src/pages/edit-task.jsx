import {useLocation} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios';

export const EditTaskPage = () => {
    const [taskData, setTaskData] = useState()
    const pathID = useLocation().pathname.split('/')[2]
    const taskID = useLocation().pathname.split('/')[4]

    const history = useNavigate();

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${pathID}`)
            .then(res =>
                res.data.user.toDoList.filter(item=>{
                    item._id == taskID && setTaskData(item)
                })
                    )
            .catch(err=>console.log(err));
    },[])

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

    const ifEmpty = (i) => {
        if (! isNaN(i)) {
            return "Task title"
        }else{
            return i
        }
    }

    const updateNote = (e) => {
        e.preventDefault()

        const updateTaskPatch = {
            title:ifEmpty(e.target[0].value),
            completed:e.target[1].checked,
            completionDate:ifIsComleted(e.target[1].checked)
        }
        axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/task/${pathID}?taskID=${taskID}`, updateTaskPatch)
            .then(res => alert("Successfully updated"))
            .catch(err=>console.log(err));
    }

    return (
        <section className="white-container">
            {
                taskData && (
                    <>
                    <form onSubmit={updateNote} className="edit-task-form" action="">
                            <label htmlFor="">Change task title: </label>
                            <input type="text" placeholder="Title" defaultValue={taskData.title}/>
                            <label>Done:<input type="checkbox" defaultChecked={taskData.completed}/></label>
                            <div>
                                <button className="submit-button">Update</button>
                            </div>
                    </form>
                    <button onClick={()=>history(-1)}>Back</button>
                    </>                                
                )
            }
        </section>)
}