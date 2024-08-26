import './index.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Oval } from 'react-loader-spinner';


import Cookies from 'js-cookie'

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrMsg, setShowErrMsg] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const navigate = useNavigate();
    
    const renderLoader = () => (
        <div className="products-loader-container">
            <Oval color="#0b69ff" height="50" width="50" />
          </div>
      )
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
        isLoading(true)
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setShowErrMsg(true);
            return;
        }
        const userDetails = { username, password };
        const url = 'https://ecommerce-23dd.onrender.com/login';
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
        isLoading(false)
    }

    const redirectToSignUpPage = () => {
        navigate('/signup');
    }
    const renderLoginPage = () => (
        <div className='log-container'>
        <div className='login-container'>
            <img src='https://res.cloudinary.com/dedvz7flb/image/upload/v1723093638/10178414_saqzym.jpg' className='login-img' alt='Login' />
            <div className='form-container'>
                <form onSubmit={submitForm}>
                    <TextField id="outlined-basic" label="USERNAME" style={{ marginBottom: '46px' }} onChange={getUserName}  className='form-input-el' variant="outlined" />
                  
                    {showPassword
                        ? <TextField label="PASSWORD" type='text' style={{ marginBottom: '36px' }} className='form-password-el' value={password} onChange={getPassword} />
                        : <TextField label="PASSWORD" style={{ marginBottom: '36px' }}  className='form-password-el' type='password' value={password} onChange={getPassword} />
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
    )
    return (
        <div>
        {loading ? renderLoader() : renderLoginPage()}
    </div>
    );
}

export default LoginPage;
