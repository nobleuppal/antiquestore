import React, {useState, useEffect} from "react";
import shoppingCart from '../assets/shopping-cart-solid.svg';
import '../stylesheets/navbar.css';
import gAntiqueLogo from '../assets/grandantiquelogo.png';
import flowersPhoto from '../assets/flowers.png';

const Navbar = ({cartItems, toLogIn, cartClick, greeting, newPageHeader}) => {

    const [pageHeader, setPageHeader] = useState('');

    useEffect(() => {
         setPageHeader(newPageHeader);
    }, [newPageHeader]);

    const handleClick = () => {
        setPageHeader(<div className="nav-bar-bottom">
                        <div>
                            <p>THESE ARE VINTAGE ITEMS</p>
                            <h3>POSSESSED BY THE BIGGEST <br/> NAMES IN HISTORY</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/> Fusce id est gravida</p>
                            <div className="dummy-btn-ctn">
                                <button>Buy Now</button>
                                <button>Read More</button>
                            </div>
                        </div>
                        <img src={flowersPhoto} alt="antique-stock"/>
                    </div>)
    }

    return(
        <div className="nav-bar">
            <div className="nav-bar-top">
                <img className="logo" src={gAntiqueLogo} alt="logo"/>
                <div className="right-side">
                    <button onClick={() => handleClick()}>Home</button>
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
            <>{pageHeader}</>          
        </div>
    )

} 

export default Navbar;