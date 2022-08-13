import React from "react";

const CheckoutItem = ({image, quantity, name, price, fileName}) => {

    return ( 
        <div style={{display: 'flex', columnGap: '1rem', paddingTop: '1rem'}}>
            <img style={{width: '10rem', margin: '0rem'}} src={image} alt={fileName}/>
            <div style={{fontSize: '1rem', textAlign: 'left', margin: '0rem'}}>
                <div>{name}</div>
                <div>${price}</div>
                <div>x{quantity}</div>
            </div>
        </div>
     );
}
 
export default CheckoutItem;