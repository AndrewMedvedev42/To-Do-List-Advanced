import {useLocation} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios';

export const EditUserDetails = () => {
    const [userData, setUserData] = useState(null)
    const pathID = useLocation().pathname.split('/')[2]

    const history = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/admin/user/${pathID}`)
        .then(res => setUserData(res.data.user)).catch(err=>console.log(err));
    },[])

    const updateUserInfo = (e, user_id) => {
        e.preventDefault();

        const ifEmpty = (i) => {
            if (!i) {
                return "--"
            }else{
                return i
            }
        }

        const updatePatch = {
            firstName:ifEmpty(e.target[0].value),
            lastName:ifEmpty(e.target[1].value)
        }

        axios.patch(`http://localhost:5000/api/v1/admin/${user_id}`, updatePatch)
           .then((res) => {
               alert("Profile updated")
           })
   }

   const deleteUserAccount = (user_id) => {
    axios.delete(`http://localhost:5000/api/v1/admin/${user_id}`)
       .then((res) => {
           alert("Account Sucsesfully deleted")
           history("/")
       })
}

    return (
        <section>
            {
                userData && (
                    <section className="white-container">
                        <form className="form" onSubmit={(e)=>{updateUserInfo(e, userData._id)}}>
                            <label htmlFor="">First name: </label>
                            <input placeholder="First name" defaultValue={userData.firstName}/>
                            <label htmlFor="">Last name: </label>
                            <input placeholder="Last name" defaultValue={userData.lastName}/>
                            <button className="submit-button">Update</button>
                        </form>
                        <button className="submit-button"  onClick={()=>{(deleteUserAccount(userData._id))}}>Delete account</button>
                        <button className="submit-button"  onClick={()=>{(history(-1))}}>Back</button>
                    </section>
                )
            }
        </section>)
}