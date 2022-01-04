export const LoginRegisterPage = () => {
    return (
        <section className="login-register-page">
            <section className="forms-container">
                <form action="">
                    <h1>Log in</h1>
                    <input placeholder="Email"/>
                    <input placeholder="Password"/>
                    <button className="submit-button">Log in</button>
                </form>
                <form action="">
                    <h1>Register</h1>
                    <input placeholder="First name"/>
                    <input placeholder="Last name"/>
                    <input placeholder="Email"/>
                    <input placeholder="Password"/>
                    <button className="submit-button">Register</button>
                </form>
                <form action="">
                    <h1>Log in as an Admin</h1>
                    <input placeholder="Email"/>
                    <input placeholder="Password"/>
                    <input placeholder="Admin Key"/>
                    <button className="submit-button">Log in as an Admin</button>
                </form>
            </section>
        </section>)
}