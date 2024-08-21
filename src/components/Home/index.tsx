import React, { useState } from "react";
import { MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
    const navigate = useNavigate();
    const [light, setLight] = useState(true);
    const toggleLight = () => {
        setLight(!light);
    }
    const logoutbtn = () => {
        Cookies.remove('jwt-token')
        navigate("/login")
    }
    const handleBtn = () => {
        navigate('/products')
    }
    const jwtToken = Cookies.get('jwt-token')
    if(jwtToken === undefined) {
        navigate("/login")
    }
    return (
  <div>
   <Header />
     <div className="home-container">
        <div className="home-heading-container">
          <h2 className="heading">Clothes That Get YOU Noticed</h2>
          <p className="note">Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.</p>
            <button type="button" onClick={handleBtn} className="shop-btn">Shop Now</button>
        </div>
    </div>
    </div>
    )
}
export default Home
