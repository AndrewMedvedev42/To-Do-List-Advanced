import {Link} from "react-router-dom";
export const UserPage = () => {
    return (
        <section className="user-page">
            <section className="user-details-container">
                <img src="#" alt="user-img" />
                <h1 className="user-name">User name</h1>
                <span className="user-id">User id</span>
                <Link to="/user/:id/user-details">
                    <button className="submit-button">Edit Deatils</button>
                </Link>
            </section>

            <section className="to-do-section">
                <form action="">
                    <h2>Create to do</h2>
                    <input placeholder="title" />
                    <textarea placeholder="text"></textarea>
                </form>

                <section className="to-do-list">
                    <article>
                        <h2>To-Do title</h2>
                        <p>To-Do text</p>
                        <button className="submit-button">Detele</button>
                        <button className="submit-button">Edit</button>
                    </article>
                </section>
            </section>
        </section>)
}