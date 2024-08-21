import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header: React.FC = () => {
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove('jwt-token')
        navigate('/login')
    }
    return (
        <nav className='nav-container'>
        <div className="shop-icon-container">
          <h1 className="nav-heading">Shop<span>Ease</span></h1>
          <img src="https://res.cloudinary.com/dedvz7flb/image/upload/v1723287766/bag_9525741_tnumi6.png" alt="shopease" className="shop-bag" />
        </div>
        <div className="link-container">
            
            <Link to="/"><p className="link-item">Home</p></Link> 
            <Link to="/products"><p className="link-item">Products</p></Link>
            <Link to="/cart"><p className="link-item">Cart</p></Link>
            <button type="button" onClick={logout}>Logout</button>
        </div>
    </nav>
    );
}

export default Header;
