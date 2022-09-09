import React, { useState } from "react";

const ProductBuy = ({details, commerce, updateCartItems}) => {

    const [quantity, setQuantity] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [loading, setLoad] = useState('Add to Cart');

    const productBuyStyle = {
        backgroundColor: 'var(--Color-Two)',
        color: 'var(--Color-Four)',
        display: 'flex',
        width: '100vw',
    }
    
    const quantityButtons = {
        backgroundColor: 'var(--Color-Four)',
        color: 'var(--Color-Two)',
        width: '2rem',
        height: '1.5rem',
        border: 'none',
        borderRadius: '0.25rem',
    }

    const cartButton = {
        backgroundColor: 'var(--Color-Four)', 
        color: 'var(--Color-Two)', 
        border:'none',
        padding: '1rem',
        borderRadius: '0.25rem',
    }


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
        <div style={productBuyStyle}>
            <img style={{width: '20rem', height: '18rem', padding: '1rem'}} src={details.image} alt={details.imageName}/>
            <div style={{display: 'flex',flexDirection: 'column' ,rowGap: '2rem', padding: '1rem'}}>
                <h2>{details.title}</h2>
                <p>${details.price}</p>
                <p>{details.description.slice(3).slice(0, details.description.length-7)}</p>
                <div style={{display: 'flex', columnGap: '1rem', width: '7rem', height: '2rem'}}>
                    <button style={quantityButtons} onClick={(e) => changeQuantity(e)} type="button" value="-">-</button>
                    <span style={{width: '3rem'}}>{quantity}</span>
                    <button style={quantityButtons} onClick={(e) => changeQuantity(e)} type="button" value="+">+</button>
                </div>
                <div style={{backgroundColor: 'var(--Color-Five)', color: 'var(--Color-Two)'}}>{errorMessage}</div>
                <button onClick={() => addToCart()} style={cartButton} type="button">{loading}</button>
            </div>
        </div>
    );
}

export default ProductBuy;