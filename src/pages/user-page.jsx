import {Link} from "react-router-dom";
export const UserPage = () => {
    return (
        <section>
            <section>
                <img src="#" alt="user-img" />
                <h1>User name</h1>
                <span>User id</span>
                <Link to="/user/:id/user-details">Edit Deatils</Link>
            </section>
            <section>
                <form action="">
                    <input placeholder="title" />
                    <textarea placeholder="text"></textarea>
                </form>
                <section>
                    <article>
                        <h2>To-Do title</h2>
                        <p>To-Do text</p>
                        <button>Detele</button>
                        <button>Edit</button>
                    </article>
                </section>
            </section>
        </section>)
}