import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

const RegistrationSucess = () => {
  const navigate = useNavigate();
  const redirectToLoginPage = () => {
    navigate('/login')
  }
 return (
  <div className='reg-success-container'>
    <div className='scnd-reg-succ-container '>
        <h2>Success!</h2>
        <p>Your account has been created</p>
        <img src='https://res.cloudinary.com/dedvz7flb/image/upload/v1723357140/check_14025690_tfzdi8.png' className='success-img' alt='success' />
        <br />
        <button className='success-btn' type='button' onClick={redirectToLoginPage}>Continue</button>
    </div>
  </div>
)
}
export default RegistrationSucess
