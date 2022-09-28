import React from "react";
import times from '../assets/times-circle-solid.svg';
import loader from '../assets/loading.svg';
import { useState } from "react";



const CartItem = ({image, quantity, name, price, fileName, itemId, removeItem}) => {

    const [spinner, setSpinVis] = useState('item-load-hide');

    const handleClick = (itemId) => {
        setSpinVis('item-load-vis');
        removeItem(itemId);
    }

    return ( 
        <div className="cart-item">
            <button onClick={() => handleClick(itemId)} className="delete-item"><img src={times} alt="times"/></button>
            <div className="item-ctn">
                <img className="item-image" src={image} alt={fileName}/>
                <div className="item-name">{name}</div>
                <div className="item-price">${price}</div>
                <div className="item-quantity">x{quantity}</div>
                <img className={spinner} src={loader} alt="loading-icon"/>
            </div>
        </div>
     );
}
 
export default CartItem;