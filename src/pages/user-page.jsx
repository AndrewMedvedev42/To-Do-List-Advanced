import {useLocation} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';
import {Link} from "react-router-dom";
export const UserPage = () => {
    const [userData, setUserData] = useState(null)
    const pathID = useLocation().pathname.split('/')[2]

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/admin/user/${pathID}`)
        .then(res => setUserData(res.data.user)).catch(err=>console.log(err));
    },[])

    return (
        <section className="user-page">
            {
                userData && (
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
                    <form className="white-container form" action="">
                        <h2>Create to do</h2>
                        <input placeholder="title" />
                        <textarea placeholder="text"></textarea>
                    </form>
    
                    <section className="to-do-list">
                        <article className="white-container">
                            <h2>To-Do title</h2>
                            <p>To-Do text</p>
                            <button className="submit-button">Detele</button>
                            <button className="submit-button">Edit</button>
                        </article>
                    </section>
                </section>
                </>
                )
            }
        </section>)
}