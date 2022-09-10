import React, { useState } from "react";
import '../stylesheets/productbuy.css';

const ProductBuy = ({details, commerce, updateCartItems}) => {

    const [quantity, setQuantity] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [loading, setLoad] = useState('Add to Cart');

    const changeQuantity = ({target: {value}}) => {
        if(value === '+' && quantity !== details.inventory) {
            setQuantity(quantity + 1);
        }
        else if (value === '-' && quantity !== 0) {
            setQuantity(quantity - 1);
        }
    }

    const addToCart = () => {
        if(quantity + itemQuantity <= details.inventory) {
            setLoad('Processing...');
            commerce.addCart(details.Id, quantity)
                    .then(res => {
                        setLoad('Add to Cart');
                        setItemQuantity(res.json.quantity);
                        updateCartItems(res.json.cart.total_items);
                    })
                    .then(setQuantity(0));
            setErrorMessage(null);
        }
        else {
            setErrorMessage('Quantity Exceeds Inventory');
        }
    }

    return(
        <div className="product-buy">
            <div className="item-container">
                <img src={details.image} alt={details.imageName}/>            
            </div>
            <div className="item-info">
                <div className="info-ctn">
                    <p className="titles"><p>Name</p><div>{details.title}</div></p>
                    <p className="titles"><p>Price</p><div>${details.price}</div></p>
                    <p className="titles"><p>Description</p><div>{details.description.slice(3).slice(0, details.description.length-7)}</div></p>
                </div>
                <div className="item-quantity">
                    <div className="quantity-ctn">
                        <button className="quantity-btn" onClick={(e) => changeQuantity(e)} type="button" value="-">-</button>
                        <span className="quantity">{quantity}</span>
                        <button className="quantity-btn" onClick={(e) => changeQuantity(e)} type="button" value="+">+</button>
                    </div>
                    <button onClick={() => addToCart()} className="cart-btn" type="button">{loading}</button>
                    <div className="quantity-error">{errorMessage}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductBuy;