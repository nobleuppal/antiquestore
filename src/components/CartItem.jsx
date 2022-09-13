import React, {useState} from "react";

const CartItem = ({image, quantity, name, price, fileName, itemId, removeItem, removing}) => {


    return ( 
        <div className="cart-item">
            <img className="item-image" src={image} alt={fileName}/>
            <div>{name}</div>
            <div>${price}</div>
            <div className="item-quantity">x{quantity}</div>
            <button onClick={() => removeItem(itemId)} className="delete-item">{removing}</button>
        </div>
     );
}
 
export default CartItem;