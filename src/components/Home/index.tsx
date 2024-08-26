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
    const [activeIndex, setActiveIndex] = useState(0);
    const slides = [
      { src: 'https://res.cloudinary.com/dedvz7flb/image/upload/v1724664845/young-woman-with-shopping-bags-beautiful-dress-hat_dl9kvg.jpg', alt: 'First slide' },
      { src: 'https://res.cloudinary.com/dedvz7flb/image/upload/v1724664755/Screenshot_124_mb4wda.png', alt: 'Second slide' },
      { src: 'https://res.cloudinary.com/dedvz7flb/image/upload/v1724664104/young-woman-with-credit-card-shopping-bag_met0ak.jpg', alt: 'Third slide' }
    ];
    const handlePrev = () => {
        setActiveIndex((prevIndex) => 
          prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
      };
    
      const handleNext = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      };
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
    // const renderCorousel = () => (
    //     <div id="carouselExampleControls" className="carousel slide">
    //     <div className="carousel-inner">
    //       {slides.map((slide, index) => (
    //         <div
    //           key={index}
    //           className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
    //         >
    //           <img style={{height: '600px', width: '1000px'}} className="d-block w-100" src={slide.src} alt={slide.alt} />
    //         </div>
    //       ))}
    //     </div>
    //     <a
    //       className="carousel-control-prev"
    //       href="#carouselExampleControls"
    //       role="button"
    //       onClick={handlePrev}
    //     >
    //       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //       <span className="sr-only">Previous</span>
    //     </a>
    //     <a
    //       className="carousel-control-next"
    //       href="#carouselExampleControls"
    //       role="button"
    //       onClick={handleNext}
    //     >
    //       <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //       <span className="sr-only">Next</span>
    //     </a>
    //   </div>
    // )   
    return (
  <div>
   <Header />
   {/* {renderCorousel()} */}
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
