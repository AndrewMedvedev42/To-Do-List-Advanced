import {useLocation} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios';

export const EditUserDetails = () => {
        //COMPONENT'S STATE
    const history = useNavigate();
    const [userData, setUserData] = useState(null)
    const [disabledButton, setDisabledButton] = useState(true)
    const [userRole, setUserRole] = useState({role:"Not a customer", userID:"---"})
    const pathID = useLocation().pathname.split('/')[2]

        //GETS USER ROLE DATA FORM SESSION STORAGE FOR VALIDATION
    useEffect(()=>{
        try {
            const roleInfo = JSON.parse(window.sessionStorage.getItem("M0NTY3ODkw"))
            if (roleInfo) {
                setUserRole(roleInfo)
            }
        } catch (error) {
            alert(error);
        }
    },[])
        //GETS USER INFO FROM DATABASE
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${pathID}`)
        .then(res => setUserData(res.data.user)).catch(err=>alert(err));
    },[pathID])
        //UPDATES USER DETAILS
    const updateUserInfo = (e, user_id) => {
        e.preventDefault();

        const ifEmptyUserData = (i) => {
            if (!Boolean(i) && !isNaN(i)) {
                return "--"
            }else{
                return i
            }
        }

        const updatePatch = {
            firstName:ifEmptyUserData(e.target[0].value),
            lastName:ifEmptyUserData(e.target[1].value)
        }

        axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${user_id}`, updatePatch)
           .then((res) => {alert("Your profile info updated!", setDisabledButton(true))}).catch(err=>alert(err))
   }
        //DELETES USER ACCOUNT
   const deleteUserAccount = (user_id) => {
    if (window.confirm("Do you really want to delete your account?")) {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${user_id}`)
        .then((res) => {
            alert("Account Sucsesfully deleted")
                history("/")})
                    .catch(err=>{alert(err)
        })
      }
}
    //JSX
    return (
        <section className="edit-user-details">
            <button className="back-button submit-button" onClick={()=>{(history(-1))}}>Back</button>
            {
                userData && (
                    //IF USER ROLE AND ID MATCHES, ACCESS TO PAGE ALLOWED 
                    userRole.role === userData.role && userRole.userID === userData._id ? (
                        <section className="white-container">
                            <form className="form" onSubmit={(e)=>{updateUserInfo(e, userData._id)}}>
                                <label htmlFor="">First name: </label>
                                <input maxLength="40" onChange={()=>{setDisabledButton(false)}} placeholder="First name" defaultValue={userData.firstName}/>
                                <label htmlFor="">Last name: </label>
                                <input maxLength="40" onChange={()=>{setDisabledButton(false)}} placeholder="Last name" defaultValue={userData.lastName}/>
                                <button className={ disabledButton ? "disabled-button" : "submit-button"} disabled={disabledButton}>Update</button>
                            </form>
                            <button className="delete-button" onClick={()=>{(deleteUserAccount(userData._id))}}>Delete account</button>
                        </section>
                    ):<h1 className="warning-message">You're not allowed to enter this page</h1>
                )
            }
        </section>)
}