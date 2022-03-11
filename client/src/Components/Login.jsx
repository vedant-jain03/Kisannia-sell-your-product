import axios from 'axios';
import React, { useState, useContext } from 'react'
// import "./form.css"
import { Link, useHistory } from "react-router-dom";
// import { usercontext } from '../Contexts/usercontext';
// import { useEffect } from 'react';
import { userContext } from "../App"
function Login() {
    const { userExist, setUserExist, setUserDetails } = useContext(userContext);
    const history = useHistory()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submit = async (e) => {
        e.preventDefault();
        const user_login = await axios.post('http://localhost:5000/login', { email, password });
        console.log(user_login);
        if (user_login.data.status === "SUCCESS") {
            setUserExist(true);
            localStorage.setItem('userExist', "true");
            const userData = await user_login.data;
            await setUserDetails(userData.user);
            localStorage.setItem('userDetails', JSON.stringify(userData.user));
            history.push('/');
        }
        alert(user_login.data.message);
        return;
    }
    return (
        <div class="login_register">
            <div className="left">
                <a href="#">KISANNIA</a>
                <img src="https://pratibharana.com/wp-content/uploads/2021/04/web-development-banner.jpg" alt="" />
                <h3>
                    Don't know what to do with the pile of garbage? <br />
                    <b><i>Sell or Donate</i></b> us in <b><i>KISANNIA</i></b> and get exciting and reasonable refunds.
                </h3>
            </div>
            <div className="right">
                <h2>Welcome</h2>
                <h4>Sign in to your Account</h4>
                <div className="inputfields">
                    <p>Username</p>
                    <input type="text" autoComplete="true" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="inputfields">
                    <p>Password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button onClick={submit}>Login</button>
                {/* <p className="para">{error}</p> */}
                <p className="para">Not have account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login