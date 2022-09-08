import React, {useState} from "react";

const CartItem = ({image, quantity, name, price, fileName, itemId, removeItem, removing}) => {


    return ( 
        <div className="cart-item">
            <img style={{width: '15rem', height: '15rem'}} src={image} alt={fileName}/>
            <div style={{width: '30rem', display: 'flex', flexDirection: 'column', height: '20rem'}}>
                <div>
                    <h4 style={{textAlign: 'left'}}>{name}</h4>
                    <div style={{textAlign: 'left'}}>${price}</div>
                </div>
                <button onClick={removeItem} id={itemId} style={{width: '10rem', height: '3rem', border: 'none', backgroundColor: 'var(--Color-Four)'}}>{removing}</button>
            </div>
            <div>x{quantity}</div>
        </div>
     );
}
 
export default CartItem;