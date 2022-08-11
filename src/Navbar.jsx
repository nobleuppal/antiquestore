import React from "react";
import shoppingCart from './assets/shopping-cart-solid.svg';

const Navbar = ({filterContainer, cartItems, toLogIn, cartClick, greeting}) => {

    const navStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        textAlign: 'end', 
        rowGap: '2rem',
        border: '1px solid var(--Color-Three)',
        borderLeft: 'none',
        borderRight: 'none',
        padding: '1rem',
        backgroundColor: 'var(--Color-One)',
        color: 'var(--Color-Three)',
        position: 'absolute',
        top: '0rem',
        left: '0rem',
        right: '0rem'
    }

    const itemStyle = {
        display: 'flex',  
        borderTop: '1px solid var(--Color-Three)', 
        paddingTop:'1rem',
        width: '90vw',
    } 

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
    }

    const searchBar = {
        borderRadius: '0.25rem', 
        border: 'none', 
        paddingLeft: '0.25rem', 
        height: '2rem',
        width: '10rem',
    }

    return(
        <div style={navStyle}>
            <h1 style={{color: 'black', fontFamily: 'cursive'}}>Welcome to the Grand Antique Store</h1>
            <div style={{marginRight: '0rem'}}>
                <button onClick={toLogIn} style={{backgroundColor: 'transparent', border: 'none', fontSize: '1.5rem'}}>{greeting}</button>
            </div>
            <div style={itemStyle}>
                <button style={buttonStyle} type="button" value="Watches" onClick={filterContainer}>Watches</button>
                <button style={buttonStyle} type="button" value="Clocks" onClick={filterContainer}>Clocks</button>
                <button style={buttonStyle} type="button" value="Necklaces" onClick={filterContainer}>Necklaces</button>
                <button style={buttonStyle} type="button" value="Shoes" onClick={filterContainer}>Shoes</button>
                <button style={buttonStyle} type="button" value="Instruments" onClick={filterContainer}>Instruments</button>
                <input onChange={filterContainer} style={searchBar} type="text"/><br/>
                <button onClick={cartClick} style={{border: 'none', backgroundColor: 'transparent'}} type="button">
                    <img style={{width: '2rem'}} src={shoppingCart} alt="shopping-cart"/>
                    <span style={{color: 'var(--Color-Two)', backgroundColor: 'var(--Color-Five)', borderRadius: '1rem', padding: '0rem 0.25rem'}}>{cartItems}</span>
                </button>
            </div>
        </div>
    )

} 

export default Navbar;