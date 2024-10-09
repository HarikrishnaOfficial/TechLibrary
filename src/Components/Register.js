import React, { useState, useEffect } from 'react'
import "../Styles/Login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [users, setUsers] = useState([]);

    async function getUsers() {
        try {
            const response = await axios.get("http://localhost:8000/users");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const navigate = useNavigate()

    function HandleLoginNavigation() {
        navigate("/")
    }

    async function postUser() {
        try {
            await axios.post("http://localhost:8000/users", { email, password });
        } catch (error) {
            console.error(error);
        }
    }

    const onButtonClick = () => {
        // console.log(users)
        users.map((user) => {
            if (user.email === email) {
                setEmailError("Email Already Exist");
            } else {
                postUser();
                navigate("/");
                alert("Register Succesful")
            }
        });
    }

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Register</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{passwordError}</label>
                <p className="navigation" onClick={HandleLoginNavigation}>Login Here</p>
            </div>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
            </div>
        </div>
    )
}

export default Register;