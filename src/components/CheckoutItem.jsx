import React from "react";

const CheckoutItem = ({image, quantity, name, price, fileName}) => {

    return ( 
        <div className="checkout-item">
            <div className="img-wrp">
                <img src={image} alt={fileName}/>
            </div>
            <div className="item-info">
                <div>{name}</div>
                <div>${price}</div>
                <div>x{quantity}</div>
            </div>
        </div>
     );
}
 
export default CheckoutItem;