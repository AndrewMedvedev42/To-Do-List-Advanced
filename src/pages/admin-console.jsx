export const AdminUserConsole = () => {
    return (
        <section className="admin-console-page">
            <article className="user-details">
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
            <section className="user-todo-list">
                <article>
                    <h2>To-Do title</h2>
                    <p>To-Do text</p>
                </article>            
            </section> 
        </section>   
    )
}