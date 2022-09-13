import React, {useState, useEffect} from "react";
import CartItem from "./CartItem";
import CheckoutItem from "./CheckoutItem";
import Mastercard from '../assets/Mastercard-logo.jpeg';
import Visa from '../assets/visa_logo.png';
import Discover from '../assets/Discover_Card_logo.png';
import Amex from '../assets/American_Express_logo.png';
import Credit from '../assets/credit-card-solid.svg';
import { countryArray } from "../accounts";
import '../stylesheets/shipping.css';

const Shipping = ({commerce, confirmClick}) => {

    const securityCodeLength = 3;
    const nameLength = 25;
    const codeLength = 6;
    const shipping = 0.00;

    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [cardType, setCardType] = useState(<img className="card-logo" src={Credit} alt='credit-card-logo'/>);
    const [cardLength, setCardLength] = useState(19);
    const [lastDigits, setLastDigits] = useState(null);
    const [error, setError] = useState(true);
    const [expError, setExpError] = useState(true);
    const [cardError, setCardError] = useState(true);
    const [rawTotal, setRawTotal] = useState();


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

    const numberCheck = ({target: {value}}) => {
        const regExMaster = /^5[1-5][0-9]{14}|^2[2-7][0-9]{14}$/;
        const regExVisa = /^4[0-9]{15}$/;
        const regExAmex = /^3[47][0-9]{13}$/;
        const regExDiscover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

        if(regExMaster.test(value)) {
            setCardType(<img  className="card-logo" src={Mastercard} alt="mastercard"/>);
            setCardLength(16);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);
            value = newValue.join(' '); 
        }
        else if(regExVisa.test(value)) {
            setCardType(<img className="card-logo" src={Visa} alt="visa"/>);
            setCardLength(16);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);
            value = newValue.join(' ');  
        }
        else if (regExAmex.test(value)) {
            setCardType(<img className="card-logo" src={Amex} alt="amex"/>);
            setCardLength(15);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);
            value = newValue.join(' '); 
        }
        else if (regExDiscover.test(value)) {
            setCardType(<img className="card-logo" src={Discover} alt="discover"/>);
            setCardLength(16);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);
            value = newValue.join(' '); 
        }
        else {
            setCardType(null);
            setCardError(true);
        }
    }

    const expirationCheck = ({target: {value}}) => {
        const regExExp = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if(!regExExp.test(value)) {
            setExpError(true);
        }
        else {
            setExpError(false);
        }
    }

    const errorCheck = ({target: {value}}) => {
        if(value === '') {
            setError(true);
        }
        else {
            setError(false);
        }
    }
    
    return ( 
        <div className="shipping">
            <form className="shipping-info">
                <h2>Shipping Address</h2>
                <div className="name-ctn">
                    <input onChange={(e) => errorCheck(e)} maxLength={nameLength} type='text' id='first-name' name="first-name" placeholder="First Name"/>
                    <input onChange={(e) => errorCheck(e)} maxLength={nameLength} type='text' id='last-name' name="last-name" placeholder="Last Name"/>
                </div>
                <div className="address-ctn">
                    <input onChange={(e) => errorCheck(e)} type='text' id='address' name="address" placeholder='Address'/>
                    <input onChange={(e) => errorCheck(e)} type='text' id="city" name="city" placeholder='City'/>
                </div>
                <div className="location-ctn">
                    <input onChange={(e) => errorCheck(e)} type='text' id='prov-state' name="prov-state" placeholder='Province/State'/>
                    <input onChange={(e) => errorCheck(e)} maxLength={codeLength} type='text' id="post-zip" name="post-zip" placeholder='Post Code/Zip Code'/>
                    <select>
                        {countryArray.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
                    </select>                   
                </div>

                <h2>Secure Payment</h2>
                <div className="card-ctn">
                    <div className="card-number"><input maxLength={cardLength} onChange={e => numberCheck(e)} placeholder='Card Number'/>{cardType}</div>
                    <div className="security-ctn">
                        <input onChange={e => expirationCheck(e)} placeholder='Exp Date (MM / YY)'/>
                        <input type='number' maxLength={securityCodeLength} placeholder='Security Code'/>
                    </div>
                </div>
            </form>
            <div className="checkout-box">
                <div className="item-list">
                    {!loading ? cartList.map(item => <CheckoutItem key={item.product_id} image={item.image.url} quantity={item.quantity} name={item.name} price={item.price.formatted_with_code} fileName={item.image.fileName}/>)                              
                              : <div>Loading...</div>
                    }
                </div>
                <div className="item-costs">
                    <div>Subtotal: ${rawTotal}</div>
                    <div>Shipping: ${0}</div>
                    <div>Tax: ${0}</div>
                    <div>Total: ${cartTotal}</div>
                    <button onClick={() => confirmClick(error, expError, cardError, lastDigits)}>Pay</button>
                </div>
            </div>
        </div>
     );
}
 
export default Shipping;