import React, {useState, useEffect} from "react";
import shoppingCart from '../assets/shopping-cart-solid.svg';
import '../stylesheets/navbar.css';
import gAntiqueLogo from '../assets/grandantiquelogo.png';
import flowersPhoto from '../assets/flowers.png';

const Navbar = ({cartItems, toLogIn, cartClick, greeting, toHome}) => {

    return(
        <div className="nav-bar">
            <img className="logo" src={gAntiqueLogo} alt="logo"/>
            <div className="right-side">
                <button onClick={toHome}>Home</button>
                <button>About us</button>
                <button>Feature</button>
                <button>Blog</button>
                <button>Contact us</button>
                <button id="log-btn" onClick={toLogIn}>{greeting}</button>
                <button onClick={cartClick} type="button">
                    <img src={shoppingCart} alt="shopping-cart"/>
                    <span>{cartItems}</span>
                </button>
            </div>           
        </div>
    )

} 

export default Navbar;