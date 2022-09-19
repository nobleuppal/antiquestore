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
    const expLength = 5;
    const shipping = 0.00;

    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [cardType, setCardType] = useState(Credit);
    const [cardNumber, setCardNumber] = useState('');
    const [cardLength, setCardLength] = useState(19);
    const [lastDigits, setLastDigits] = useState(null);
    const [error, setError] = useState(true);
    const [expError, setExpError] = useState(true);
    const [cardError, setCardError] = useState(true);
    const [rawTotal, setRawTotal] = useState();
    const [expDate, setExpDate] = useState('00/00');
    const [securityCode, setSecurityCode] = useState('###');
    const [secError, setSecError] = useState(true);



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
        let cardSpacerSixteen;
        let cardSpacerFifteen;

        setCardNumber(value);

        if (value.length === 16) {
            const block = value.substring(0,4);
            const blockTwo = value.substring(4,8);
            const blockThree = value.substring(8,12);
            const blockFour = value.substring(12,16);
            cardSpacerSixteen = block.concat(' ').concat(blockTwo).concat(' ').concat(blockThree).concat(' ').concat(blockFour);
        }
        else if (value.length === 15) {
            const block = value.substring(0,4);
            const blockTwo = value.substring(4,10);
            const blockThree = value.substring(10,15);
            cardSpacerFifteen = block.concat(' ').concat(blockTwo).concat(' ').concat(blockThree);
        }

        if(regExMaster.test(value)) {
            console.log(value);
            setCardNumber(cardSpacerSixteen);
            setCardType(Mastercard);
            setCardLength(19);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);         
        }
        else if(regExVisa.test(value)) {
            setCardNumber(cardSpacerSixteen);
            setCardType(Visa);
            setCardLength(19);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);           
        }
        else if (regExAmex.test(value)) {
            setCardNumber(cardSpacerFifteen);
            setCardType(Amex);
            setCardLength(17);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);
           
        }
        else if (regExDiscover.test(value)) {
            setCardNumber(cardSpacerSixteen);
            setCardType(Discover);
            setCardLength(19);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);
        }
        else {
            setCardType(Credit);
            setCardError(true);
        }
    }

    const expirationCheck = ({target: {value}}) => {
        const regExExp = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        setExpDate(value);

        const text = value.substring(0,2);
        const textTwo = value.substring(2);

        if(!regExExp.test(value)) {
            setExpError(true);
        }
        else {
            setExpError(false);
            if(value[2] !== '/')  {   
                setExpDate(text.concat('/').concat(textTwo));
            }
            else {
                setExpDate(text.concat(textTwo));                
            }
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

    const securityCheck = ({target: {value}}) => {
        const regExCvv = /^[0-9]{3}$/;
        setSecurityCode(value);

        if(!regExCvv.test(value)) {
            setSecError(true);
        }
        else {
            setSecError(false);
            setSecError(value);
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
                    <div className="card-number"><input type='text' value={cardNumber} maxLength={cardLength} onChange={e => numberCheck(e)} placeholder='Card Number'/><img className="card-logo" src={cardType} alt="card-logo"/></div>
                    <div className="security-ctn">
                        <input maxLength={expLength} type="text" value={expDate} onChange={e => expirationCheck(e)} placeholder='Exp Date (MM / YY)'/>
                        <input value={securityCode} type='text' onChange={e => securityCheck(e)} maxLength={securityCodeLength} placeholder='Security Code'/>
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