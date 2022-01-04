import { Link } from "react-router-dom";

export const NavigationMenu = () => {
    return (
        <nav>
            <span>To-Do</span>
            <button>Logout</button>
            <Link to="/">Login/Register</Link>
            <Link to="/users/42">User Page</Link>
            <Link to="/users/42/user-details">Edit User Details</Link>
            <Link to="/users/42/edit-note/365">User Edit Note</Link>
            <Link to="/admin">Admin Page</Link>
            <Link to="/admin/console/42">Admin Console</Link>
        </nav>)
}