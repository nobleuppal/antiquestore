import React from "react";

const ProductCard = ({details, buyProduct}) => {

    const cardStyle = {
        width: '18rem',
        height: '17rem',
        backgroundColor: 'var(--Color-Two)',
        paddingTop: '1rem',
        border: '0.25rem solid var(--Color-Three)',
        fontSize: '0.75rem', 
        color: 'var(--Color-Three)',
        cursor: 'pointer',
    }

    
    
    return(
        <div onClick={() => buyProduct(details)} style={cardStyle}>
            <img style={{width: '14rem', height: '13rem'}} src={details.image} alt={details.imageName}/>
            <h2>{details.title}</h2>
            <p>$ {details.price}</p>
        </div>
    );
}


export default ProductCard;