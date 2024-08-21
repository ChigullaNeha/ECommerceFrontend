import './index.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrMsg, setShowErrMsg] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove('jwt-token');
    }, [navigate]);

    const getUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const toggleCheckBox = () => {
        setShowPassword(!showPassword);
    }
    const onSubmitSuccess = AccessToken => {
        Cookies.set("jwt-token", AccessToken, {
            expires: 30
        })
        navigate("/")
    }
    const onSubmitFailure = () => {
        setShowErrMsg(true)
    }

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setShowErrMsg(true);
            return;
        }
        const userDetails = { username, password };
        const url = 'http://localhost:8080/login';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            
             if (response.ok === true) {
                onSubmitSuccess(data.access_token)
            } else  {
               onSubmitFailure();
            }
        } catch (error) {
            onSubmitFailure();
            
        }
    }

    const redirectToSignUpPage = () => {
        navigate('/signup');
    }
    
    return (
        <div className='log-container'>
            <div className='login-container'>
                <img src='https://res.cloudinary.com/dedvz7flb/image/upload/v1723093638/10178414_saqzym.jpg' className='login-img' alt='Login' />
                <div className='form-container'>
                    <form onSubmit={submitForm}>
                        <p className='user'>USERNAME</p>
                        <input type='text' className='form-input-el' onChange={getUserName} value={username} />
                        <p className='user'>PASSWORD</p>
                        {showPassword
                            ? <input type='text' className='form-input-el' value={password} onChange={getPassword} />
                            : <input className='form-input-el' type='password' value={password} onChange={getPassword} />
                        }
                        <div className='show-password-container'>
                            <input type='checkbox' onChange={toggleCheckBox} className='check-box' />
                            <p className='show'>Show Password</p>
                        </div>
                        {showErrMsg && <p className='error-msg'>*Username or password required</p>}
                        <br />
                        <div className='btns-container'>
                            <button type='submit' className='s-btn'>SignIn</button>
                            <button type='button' className='s-btn' onClick={redirectToSignUpPage}>SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
