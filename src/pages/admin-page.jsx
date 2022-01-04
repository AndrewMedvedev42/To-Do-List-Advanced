import {
    Routes,
    Route,
    Link
  } from "react-router-dom";

export const AdminPage = () => {
    return (
        <section>
            <section>
                <article>
                    <img src="#" alt="user-img" />
                    <h1>User name</h1>
                    <span>User id</span>
                    <p>Last did:</p>
                    <form action="">
                        <label htmlFor="">Active user</label>
                        <input type="checkbox" />
                        <button>Update</button>
                    </form>
                    <button>Delete</button>
                </article>
            </section>
        </section>)
}