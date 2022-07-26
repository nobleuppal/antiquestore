import React from "react";
import shoppingCart from './assets/shopping-cart-solid.svg';

const Navbar = () => {

    const navStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        textAlign: 'end', 
        rowGap: '2rem',
        border: '1px solid var(--Color-Three)',
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

    return(
        <div style={navStyle}>
            <div style={{marginRight: '0rem'}}>
                <div>Sign up/Log in</div>
            </div>
            <div style={itemStyle}>
                <div>Watches</div>
                <div>Clocks</div>
                <div>Necklaces</div>
                <div>Shoes</div>
                <div>Instruments</div>
                <input style={{borderRadius: '0.25rem', border: 'none', paddingLeft: '0.25rem', height: '2rem'}} type="text"></input><br/>
                <div><img style={{width: "2rem"}} src={shoppingCart} alt="shopping-cart"/></div>
            </div>
        </div>
    )

} 

export default Navbar;