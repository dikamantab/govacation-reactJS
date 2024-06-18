import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { UserContext } from "../../context/userContext";
import Swal from 'sweetalert2';
import "./login.css";

const Login = ({ setShowLogin }) => {
    const { setUser } = useContext(UserContext);
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nomor_telepon, setNomorTelepon] = useState("");
    const [alamat, setAlamat] = useState("");

    const role = { role: "user" }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
                nomor_telepon,
                alamat,
                role: "user",
            });
            console.log("Response from register:", response);
            if (response.status === 200) {
                Swal.fire('Success!', 'Registration successful!', 'success');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('user', JSON.stringify({ id: response.data.id, name: response.data.name }));
                setUser({ id: response.data.id, name: response.data.name, token: response.data.token });
                window.location.href = "/";
            } else {
                Swal.fire('Error!', 'Registration failed!', 'error');
            }
        } catch (error) {
            console.error("There was an error registering!", error);
            Swal.fire('Error!', 'There was an error registering!', 'error');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                name,
                password
            });
            console.log("Response from login:", response);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({ id: response.data.id, name: response.data.name }));
                setUser({ id: response.data.id, name: response.data.name, token: response.data.token });
                Swal.fire('Success!', 'Login successful!', 'success');
                window.location.href = "/";
            } else {
                Swal.fire('Error!', 'Login failed!', 'error');
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
            Swal.fire('Error!', 'There was an error logging in!', 'error');
        }
    };

    return (
        <div className='login-popup'>
            <div className="login-popup-container">
                <div className="login-popup-header">
                    <h2>{isRegister ? "Register" : "Login"}</h2>
                    <img className="close-icon" onClick={() => setShowLogin(false)} src={require('../../Assets/close.png')} alt="Close" />
                </div>
                <form onSubmit={isRegister ? handleRegister : handleLogin} className="login-popup-inputs">
                    {isRegister && (
                        <>
                            <input type="text" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="text" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <input type="text" placeholder='Phone number' value={nomor_telepon} onChange={(e) => setNomorTelepon(e.target.value)} required />
                            <input type="text" placeholder='Address' value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
                        </>
                    )}
                    {!isRegister && (
                        <>
                            <input type="text" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </>
                    )}
                    <button type="submit">{isRegister ? "Register" : "Login"}</button>
                </form>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <label>I agree to the <span>Terms and Conditions</span></label>
                </div>
                <p onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Already have an account? Login here" : "Create a new account? Register here"}</p>
            </div>
        </div>
    );
};

export default Login;
