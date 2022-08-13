import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";

const CartPage = ({commerce, updateCartItems, shippingClick}) => {

    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [removing, setRemoving] = useState('Remove');

    
    useEffect(() => {
        setLoading(true);
        commerce.getCart()
                .then(res => {
                    setLoading(false);
                    console.log(res.json);
                    setCartList(res.json.line_items);
                    setCartTotal(res.json.subtotal.formatted_with_code);
                })        
    }, [])

    const removeItem = ({target: {id}}) => {
        setRemoving('Removing...');
        commerce.deleteCart(id)
                .then(res => {
                        console.log(res.json);
                        setRemoving('Remove');
                        updateCartItems(res.json.cart.total_items);
                        setCartList(res.json.cart.line_items);
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
                {!loading ? (cartList.length !== 0 ? cartList.map(item => <CartItem key={item.product_id} removing={removing} itemId={item.id} removeItem={removeItem} image={item.image.url} quantity={item.quantity} name={item.name} price={item.price.formatted_with_code} fileName={item.image.fileName}/>)
                                            : <div>Empty Cart</div>)
                          : <div>Loading...</div>
                }
            </div>
            <div style={checkoutStyle}>
                <button onClick={shippingClick} style={{width: '20rem', height: '3rem', backgroundColor: 'var(--Color-Five)', border: 'none'}}>Checkout</button>
                <div>Subtotal: ${cartTotal}</div>
            </div>
        </div>
     );
}
 
export default CartPage;