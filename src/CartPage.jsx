import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";

const CartPage = ({commerce, updateCartItems}) => {

    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState();
    
    useEffect(() => {
        commerce.getCart()
                .then(res => {
                    console.log(res.json);
                    setCartList(res.json.line_items);
                    setCartTotal(res.json.subtotal.formatted_with_code);
                })        
    })

    const removeItem = ({target: {id}}) => {
        commerce.updateCart(id)
                .then(res => {
                        updateCartItems(res.json.cart.total_items);
                    }
                );
    }

    const checkoutStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        rowGap: '15rem', 
        backgroundColor: 'var(--Color-Two)', 
        color: 'var(--Color-Three)',
        padding: '5rem',
        marginTop: '15rem'
    }
               
    return ( 
        <div style={{display: 'flex'}}>
            <div style={{width: '100vw', marginTop: '20rem', display: 'flex', flexDirection: 'column', rowGap: '1rem'}}>
                {cartList.map(item => <CartItem key={item.product_id} itemId={item.id} removeItem={removeItem} image={item.image.url} quantity={item.quantity} name={item.name} price={item.price.formatted_with_code} fileName={item.image.fileName}/>)}
            </div>
            <div style={checkoutStyle}>
                <button style={{width: '20rem', height: '3rem', backgroundColor: 'var(--Color-Five)', border: 'none'}}>Checkout</button>
                <div>Subtotal: {cartTotal}</div>
            </div>
        </div>
     );
}
 
export default CartPage;