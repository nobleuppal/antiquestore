import React from "react";
import greenCheckmark from './assets/green_checkmark.png';

const Confirmation = ({lastDigits}) => {
    return (
        <div style={{marginTop: '20rem', width: '100vw', height: '100vh'}}>
            <div style={{color: 'var(--Color-Four)'}}>Payment Successful!</div>
            <img width='100rem' height='100rem' src={greenCheckmark} alt='green-checkmark'/>
            <div style={{color: 'var(--Color-Four)'}}>Card ending in ...{lastDigits}</div>
        </div>
      );
}
 
export default Confirmation;