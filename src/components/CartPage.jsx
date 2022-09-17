import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import '../stylesheets/cartpage.css';


const CartPage = ({commerce, updateCartItems, shippingClick}) => {

    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState();
    const [rawTotal, setRawTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [removing, setRemoving] = useState(false);

    
    useEffect(() => {
        setLoading(true);
        commerce.getCart()
                .then(res => {
                    setLoading(false);
                    setCartList(res.json.line_items);
                    setCartTotal(res.json.subtotal.formatted_with_code);
                    setRawTotal(res.json.subtotal.raw);
                })        
    }, [])

    const removeItem = (itemId) => {
        setRemoving(true);
        commerce.deleteCart(itemId)
                .then(res => {
                        console.log(res);
                        setRemoving(false);
                        updateCartItems(res.json.cart.total_items);
                        setCartList(res.json.cart.line_items);
                        setRawTotal(res.json.cart.subtotal.raw);
                    }
                );
    }


      
    return ( 
        <div className="cart-page">
            <div className="cart-item-ctn">
                {!loading ? (cartList.length !== 0 ? cartList.map(item => <CartItem key={item.product_id} itemId={item.id} removeItem={removeItem} image={item.image.url} quantity={item.quantity} name={item.name} price={item.price.formatted_with_code} fileName={item.image.fileName}/>)
                                            : <div>Empty Cart</div>)
                          : <div>Loading...</div>
                }
            </div>
            <div className="checkout-box">
                <h6>Summary</h6>
                <div className="checkout-costs">
                    <div><span>Subtotal</span> <span>${rawTotal}</span></div>
                    <div><span>Shipping</span> <span>${0.00}</span></div>
                    <div><span>Tax</span> <span>${0.00}</span></div>
                </div>
                <div className="total-checkout">
                    <div className="total-cost"><span>Total</span> <span>${rawTotal} CAD</span></div>
                    <button onClick={shippingClick}>Checkout</button>
                </div>
            </div>
        </div>
     );
}
 
export default CartPage;