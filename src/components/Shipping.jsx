import React, {useState, useEffect} from "react";
import CheckoutItem from "./CheckoutItem";
import Mastercard from '../assets/Mastercard-logo.jpeg';
import Visa from '../assets/visa_logo.png';
import Discover from '../assets/Discover_Card_logo.png';
import Amex from '../assets/American_Express_logo.png';
import Credit from '../assets/credit-card-solid.svg';
import { countryArray } from "../accounts";
import '../stylesheets/shipping.css';

const Shipping = ({commerce, confirmClick}) => {

    const securityCodeLength = 4;
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
    const [rawTotal, setRawTotal] = useState();
    const [expDate, setExpDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');

    const [firstError, setFirstError] = useState('');
    const [lastError, setLastError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [provinceError, setProvinceError] = useState('');
    const [postError, setPostError] = useState('');
    const [expError, setExpError] = useState('');
    const [cardError, setCardError] = useState('');
    const [secError, setSecError] = useState('');

    const handleClick = (lastDigits) => {
        if(firstError === null && 
           lastError === null && 
           addressError === null && 
           cityError === null && 
           provinceError === null && 
           postError === null &&
           expError === null &&
           cardError === null &&
           secError === null 
           ) 
        {
            confirmClick(lastDigits);
        }
    }


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
            setCardError(null);         
        }
        else if(regExVisa.test(value)) {
            setCardNumber(cardSpacerSixteen);
            setCardType(Visa);
            setCardLength(19);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(null);                   
        }
        else if (regExAmex.test(value)) {
            setCardNumber(cardSpacerFifteen);
            setCardType(Amex);
            setCardLength(17);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(null);                   
        }
        else if (regExDiscover.test(value)) {
            setCardNumber(cardSpacerSixteen);
            setCardType(Discover);
            setCardLength(19);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(null);         
        }
        else {
            setCardType(Credit);
        }
    }

    const expirationCheck = ({target: {value}}) => {
        setExpDate(value);

        const text = value.substring(0,2);
        const textTwo = value.substring(2);

        if(value.length >= 4) {
            if(value[2] !== '/')  {   
                setExpDate(text.concat('/').concat(textTwo));
            }
            else {
                setExpDate(text.concat(textTwo));                
            }
        }

    }


    const securityCheck = ({target: {value}}) => {
        setSecurityCode(value);
    }

  

    const firstCheck = ({target: {value}}) => {
        if(value === '') {
            setFirstError('first-error');
        }
        else {
            setFirstError(null);
        }
    }

    const lastCheck = ({target: {value}}) => {
        if(value === '') {
            setLastError('last-error');
        }
        else {
            setLastError(null);
        }
    }
    
    const addressCheck = ({target: {value}}) => {
        const addressRegEx = /^[#.0-9a-zA-Z\s,-]+$/;

        if(addressRegEx.test(value)) {
            setAddressError(null);
        }
        else {
            setAddressError('address-error');
        }
    }

    const cityCheck = ({target: {value}}) => {
        const cityRegEx = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;

        if(cityRegEx.test(value) && value !== '') {
            setCityError(null);
        }
        else {
            setCityError('city-error');
        }
    }

    const provinceCheck = ({target: {value}}) => {
        const cityRegEx = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
        
        if(cityRegEx.test(value) && value !== '') {
            setProvinceError(null);
        }
        else {
            setProvinceError('province-error');
        }
    }

    const postCheck = ({target: {value}}) => {
        if(value === '') {
            setPostError('post-error');
        }
        else {
            setPostError(null);
        }
    }

    const cardErrorMessage = () => {
        if(cardType === Credit) {
            setCardError('card-number-error');
        }
    }

    const expErrorMessage = ({target: {value}}) => {
        const regExExp = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

        if(!regExExp.test(value)) {
            setExpError('expiration-error');
        }
        else {
            setExpError(null);
        }
    }

    const secErrorMessage = ({target: {value}}) => {
        const regExCode = /^[0-9]{3,4}$/;

        if(!regExCode.test(value)) {
            setSecError('security-error');
        }
        else {
            setSecError(null);
        }      
    }

    return ( 
        <div className="shipping">
            <form className="shipping-info">
                <h2>Shipping Address</h2>
                <div className="name-ctn">
                    <div>
                        <input onBlur={e => firstCheck(e)} maxLength={nameLength} type='text' id='first-name' name="first-name" placeholder="First Name"/>
                        <p className={firstError}>Please enter a valid name</p>
                    </div>
                    <div>
                        <input onBlur={e => lastCheck(e)} maxLength={nameLength} type='text' id='last-name' name="last-name" placeholder="Last Name"/>
                        <p className={lastError}>Please enter a valid name</p>
                    </div>
                </div>
                <div className="address-ctn">
                    <div>
                        <input onBlur={e => addressCheck(e)} type='text' id='address' name="address" placeholder='Address'/>
                        <p className={addressError}>Please enter a valid address</p>
                    </div>
                    <div>
                        <input onBlur={e => cityCheck(e)} type='text' id="city" name="city" placeholder='City'/>
                        <p className={cityError}>Please enter a valid city name</p>
                    </div>
                </div>
                <div className="location-ctn">
                    <div>
                        <input onBlur={e => provinceCheck(e)} type='text' id='prov-state' name="prov-state" placeholder='Province/State'/>
                        <p className={provinceError}>Please enter a valid province/state</p>
                    </div>
                    <div>
                        <input onBlur={e => postCheck(e)} maxLength={codeLength} type='text' id="post-zip" name="post-zip" placeholder='Post Code/Zip Code'/>
                        <p className={postError}>Please enter a valid post/zip code</p>
                    </div>                  
                </div>

                <select>
                        {countryArray.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
                </select> 

                <h2>Secure Payment</h2>
                <div className="card-ctn">
                    <div className="card-number-ctn">
                        <div><input type='text' value={cardNumber} maxLength={cardLength} onBlur={() => cardErrorMessage()} onChange={e => numberCheck(e)} placeholder='Card Number'/><img className="card-logo" src={cardType} alt="card-logo"/></div>
                        <p className={cardError}>Please enter a valid card number</p>
                    </div>
                    <div className="security-ctn">
                        <div>
                            <input maxLength={expLength} type="text" value={expDate} onBlur={e => expErrorMessage(e)} onChange={e => expirationCheck(e)} placeholder='Exp Date (MM / YY)'/>
                            <p className={expError}>Please enter a valid expiration date</p>
                        </div>
                        <div>
                            <input value={securityCode} type='text' onBlur={e => secErrorMessage(e)} onChange={e => securityCheck(e)} maxLength={securityCodeLength} placeholder='Security Code'/>
                            <p className={secError}>Please enter a valid security code</p>
                        </div>
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
                    <div>Shipping: ${shipping}</div>
                    <div>Tax: ${0}</div>
                    <div>Total: ${cartTotal}</div>
                    <button onClick={() => handleClick(lastDigits)}>Pay</button>
                </div>
            </div>
        </div>
     );
}
 
export default Shipping;