import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [accept, setIsAccept] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const toggleAccept = () => {
        setIsAccept(!accept);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check for empty fields
        if (!firstName || !lastName || !username) {
            setError('All fields are required');
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check if terms and conditions are accepted
        if (!accept) {
            setError('You must accept the terms and conditions');
            return;
        }

        try {
            const role = "USER";
            const response = await fetch('https://ecommerce-23dd.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    firstName,
                    lastName,
                    role
                }),
            });

            if (!response.ok) {
                console.log(response)
                // const errorData = await response.json();
                // throw new Error(errorData.message || 'Registration failed. Please try again.');
            }
            

            navigate('/reg-success');
        } catch (err) {
            console.log(err)
            setError((err as Error).message);
        }
    };

    const passwordsMatch = password === confirmPassword;

    return (
        <div className='registration-container'>
            <h3>Registration</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter First name'
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className='input-el'
                />
                <br />
                <input
                    type='text'
                    placeholder='Enter Last name'
                    value={lastName}
                    onChange={handleLastNameChange}
                    className='input-el'
                />
                <br />
                <input
                    type='text'
                    placeholder='Enter Username'
                    value={username}
                    onChange={handleUsernameChange}
                    className='input-el'
                />
                <br />
                <input
                    type='password'
                    placeholder='Create password'
                    value={password}
                    onChange={handlePasswordChange}
                    className='input-el'
                />
                <br />
                <input
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className='input-el'
                />
                <div className='checkbox-container'>
                    <input
                        type='checkbox'
                        onChange={toggleAccept}
                        className='check'
                    />
                    <p className='accept'>I accept all terms and conditions</p>
                </div>
                <button
                    type='submit'
                    disabled={!passwordsMatch || !accept || !firstName || !lastName || !username}
                >
                    Register Now
                </button>
                {error && <p className='error'>{error}</p>}
                <p>Already have an account? <a href='/login'>Login now</a></p>
            </form>
        </div>
    );
};

export default SignupPage;
