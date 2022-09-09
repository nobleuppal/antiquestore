import React, {useState, useEffect} from "react";
import CartItem from "./CartItem";
import CheckoutItem from "./CheckoutItem";
import Mastercard from '../assets/Mastercard-logo.jpeg';
import Visa from '../assets/visa_logo.png';
import Discover from '../assets/Discover_Card_logo.png';
import Amex from '../assets/American_Express_logo.png';
import Credit from '../assets/credit-card-solid.svg';
import { countryArray } from "../accounts";

const Shipping = ({commerce, confirmClick}) => {

    const cardStyle = {
        width: '3rem',
        height: '2rem'
    }

    const securityCodeLength = 3;
    const nameLength = 25;
    const codeLength = 6;
    const shipping = 0.00;

    const checkoutStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        rowGap: '1rem', 
        backgroundColor: 'var(--Color-Two)', 
        color: 'var(--Color-Three)',
        padding: '5rem',
        marginTop: '15rem'
    }

    const inputStyle = {
        height: '2rem',
        width: '15rem',
        paddingLeft: '0.25rem',
        margin: '0rem'
    }
    
    const selectStyle = {
        height: '2rem',
        width: '15.5rem',
        paddingLeft: '0.25rem',
        margin: '0rem'
    }

    const infoStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        rowGap: '1rem', 
        border: '1px solid var(--Color-Four)', 
        padding: '1rem',
        width: '18rem',
    }


    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [cardType, setCardType] = useState(<img style={cardStyle} src={Credit} alt='credit-card-logo'/>);
    const [cardLength, setCardLength] = useState(19);
    const [lastDigits, setLastDigits] = useState(null);
    const [error, setError] = useState(true);
    const [expError, setExpError] = useState(true);
    const [cardError, setCardError] = useState(true);
    const [rawTotal, setRawTotal] = useState(1500);


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
            setCardType(<img style={cardStyle} src={Mastercard} alt="mastercard"/>);
            setCardLength(16);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);
            value = newValue.join(' '); 
        }
        else if(regExVisa.test(value)) {
            setCardType(<img style={cardStyle} src={Visa} alt="visa"/>);
            setCardLength(16);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);
            value = newValue.join(' ');  
        }
        else if (regExAmex.test(value)) {
            setCardType(<img style={cardStyle} src={Amex} alt="amex"/>);
            setCardLength(15);
            let newValue = value.match(/.{1,4}/g);
            setLastDigits(newValue[3]);
            setCardError(false);
            value = newValue.join(' '); 
        }
        else if (regExDiscover.test(value)) {
            setCardType(<img style={cardStyle} src={Discover} alt="discover"/>);
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
        <div style={{display: 'flex'}}>
            <form style={{width: '100vw', marginTop: '20rem', display: 'flex', flexDirection: 'column', rowGap: '1rem'}}>
            <h2>Shipping Address</h2>
            <div style={infoStyle}>
                <input onChange={(e) => errorCheck(e)} maxLength={nameLength} type='text' id='first-name' name="first-name" style={inputStyle} placeholder="First Name"/>
                <input onChange={(e) => errorCheck(e)} maxLength={nameLength} type='text' id='last-name' name="last-name" style={inputStyle} placeholder="Last Name"/>
            </div>
            <div style={infoStyle}>
                <input onChange={(e) => errorCheck(e)} type='text' id='address' name="address" style={inputStyle} placeholder='Address'/>
                <input onChange={(e) => errorCheck(e)} type='text' id="city" name="city" style={inputStyle} placeholder='City'/>
                <input onChange={(e) => errorCheck(e)} type='text' id='prov-state' name="prov-state" style={inputStyle} placeholder='Province/State'/>
                <input onChange={(e) => errorCheck(e)} maxLength={codeLength} type='text' id="post-zip" name="post-zip" style={inputStyle} placeholder='Post Code/Zip Code'/>
                <select style={selectStyle}>
                    {countryArray.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
                </select>                   
            </div>

            <h2>Secure Payment</h2>
            <div style={infoStyle}>
                    <div style={{margin: '0rem', display: 'flex'}}><input maxLength={cardLength} onChange={e => numberCheck(e)} style={inputStyle} placeholder='Card Number'/>{cardType}</div>
                    <input onChange={e => expirationCheck(e)} style={inputStyle} placeholder='Exp Date (MM / YY)'/>
                    <input type='number' maxLength={securityCodeLength} style={inputStyle} placeholder='Security Code'/>
            </div>
            </form>
            <div style={checkoutStyle}>
                <div style={{width: '30rem'}}>
                    {!loading ? cartList.map(item => <CheckoutItem key={item.product_id} image={item.image.url} quantity={item.quantity} name={item.name} price={item.price.formatted_with_code} fileName={item.image.fileName}/>)                              
                              : <div>Loading...</div>
                    }
                </div>
                <div style={{margin: '0rem', textAlign: 'left'}}>Items: ${cartTotal}</div>
                <button onClick={() => confirmClick(error, expError, cardError, lastDigits)} style={{width: '20rem', height: '3rem', backgroundColor: 'var(--Color-Five)', border: 'none'}}>Pay</button>
            </div>
        </div>
     );
}
 
export default Shipping;