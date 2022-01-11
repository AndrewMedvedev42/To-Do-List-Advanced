import { Link } from "react-router-dom";

export const NavigationMenu = () => {
    //NAVIGATION MENU COMPONENT
    return (
        <nav className="navigation-menu">
            <span className="web-app-title">To-Do</span>
            <Link to="/"><button>Login / Register</button></Link>
        </nav>)
}