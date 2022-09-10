import React from "react";
import '../stylesheets/productcard.css';

const ProductCard = ({details, buyProduct}) => {

    return(
        <div className="product-card" onClick={() => buyProduct(details)}>
            <img src={details.image} alt={details.imageName}/>
            <div>{details.title}</div>
            <p>$ {details.price}</p>
        </div>
    );
}


export default ProductCard;