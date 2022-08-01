import React from "react";
import shoppingCart from './assets/shopping-cart-solid.svg';

const Navbar = ({filterContainer}) => {

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
        color: 'var(--Color-Three)'
    }

    const itemStyle = {
        display: 'flex', 
        columnGap: '2rem', 
        borderTop: '1px solid var(--Color-Three)', 
        paddingTop:'1rem',
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
            <div style={{marginRight: '0rem'}}>
                <button style={{backgroundColor: 'transparent', border: 'none', fontSize: '1.5rem'}}>Sign up/Log in</button>
            </div>
            <div style={itemStyle}>
                <button style={buttonStyle} type="button" value="Watches" onClick={filterContainer}>Watches</button>
                <button style={buttonStyle} type="button" value="Clocks" onClick={filterContainer}>Clocks</button>
                <button style={buttonStyle} type="button" value="Necklaces" onClick={filterContainer}>Necklaces</button>
                <button style={buttonStyle} type="button" value="Shoes" onClick={filterContainer}>Shoes</button>
                <button style={buttonStyle} type="button" value="Instruments" onClick={filterContainer}>Instruments</button>
                <input onChange={filterContainer} style={searchBar} type="text"/><br/>
                <button style={{border: 'none', backgroundColor: 'transparent'}} type="button"><img style={{width: "2rem"}} src={shoppingCart} alt="shopping-cart"/></button>
            </div>
        </div>
    )

} 

export default Navbar;