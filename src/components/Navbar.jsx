import shoppingCart from '../assets/shopping-cart-solid.svg';
import '../stylesheets/navbar.css';
import gAntiqueLogo from '../assets/grandantiquelogo.png';


const Navbar = ({cartItems, navBarMenu, cartClick}) => {

    return(
        <div className="nav-bar">
            <img className="logo" src={gAntiqueLogo} alt="logo"/>
            <div className="right-side">
                {navBarMenu}
                <button onClick={cartClick} type="button">
                    <img className='shopping-cart' src={shoppingCart} alt="shopping-cart"/>
                    <span>{cartItems}</span>
                </button>
            </div>           
        </div>
    )

} 

export default Navbar;