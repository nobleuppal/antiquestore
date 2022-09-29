import React from "react";
import greenCheckmark from '../assets/green_checkmark.png';
import '../stylesheets/confirmation.css';

const Confirmation = ({lastDigits}) => {
    return (
        <div className="confirmation">
            <div>Payment Successful!</div>
            <img src={greenCheckmark} alt='green-checkmark'/>
            <div>Card ending in ...{lastDigits}</div>
        </div>
      );
}
 
export default Confirmation;