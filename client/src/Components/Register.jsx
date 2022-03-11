import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
function Register() {
    const history = useHistory()
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState();

    const submit = async (e) => {
        e.preventDefault();
        const user_register = await axios.post('http://localhost:5000/register', { name, email, password, phone, location });
        console.log(user_register);
        if (user_register.data.status === "SUCCESS") {
            alert(user_register.data.message);
            history.push('/login');
        }
        else {
            alert(user_register.data.message);
        }
    }

    return (
        <div class="login_register">
            <div className="left">
                <a href="#">Kisannia</a>
                <img src="https://pratibharana.com/wp-content/uploads/2021/04/web-development-banner.jpg" alt="" />
                <h3>
                    Don't know what to do with the pile of garbage? <br />
                    <b><i>Sell or Donate</i></b> us in <b><i>KISANNIA</i></b> and get exciting and reasonable refunds.
                </h3>
            </div>
            <div className="right">
                <h2>Welcome</h2>
                <h4>Sign Up for your Account</h4>
                <div className="inputfields">
                    <p>Name</p>
                    <input type="text" autoFocus="true" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="inputfields">
                    <p>Email</p>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="inputfields">
                    <p>Password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="inputfields">
                    <p>Phone Number</p>
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="inputfields">
                    <p>Location</p>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <button onClick={submit} >Register</button>
                <p className="para">Already have account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register