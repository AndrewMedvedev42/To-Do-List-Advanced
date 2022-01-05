import {
    Link
  } from "react-router-dom";

export const AdminPage = () => {
    return (
        <section className="admin-page">
            <section>
                <Link to="/admin/console/user/42">
                    <article>
                        <img src="#" alt="user-img" />
                        <h1>User name</h1>
                        <span>User id</span>
                        <form action="">
                            <label htmlFor="">Active user</label>
                            <input type="checkbox" />
                            <button>Update</button>
                        </form>
                        <button>Delete</button>
                    </article>
                </Link>
            </section>
        </section>)
}