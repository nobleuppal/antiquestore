import React, { useState } from 'react';
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';
import times from '../assets/times-circle-solid.svg';

const LogIn = ({toLogIn, updateAccounts, checkAccounts, match}) => { 
    
    const [accountStatus, setStatus] = useState(<SignIn checkAccounts={checkAccounts}/>)

    const buttonStyle = {
        backgroundColor: 'transparent',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
    }

    const modalStyle = {
        width: '40rem', 
        marginTop: '10rem', 
        height: '30rem', 
        zIndex: '5', 
        position: 'fixed', 
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'var(--Color-Two)',
        color: 'var(--Color-Five)',
        border: '0.25rem solid var(--Color-Four)',
    }

    const crossStyle = {
        width: '2rem', 
        backgroundColor: 'transparent', 
        border: 'none', 
        position: 'absolute',
        right: '0',
     }

    return (  
        <div style={modalStyle}>
            <button onClick={toLogIn} style={crossStyle}><img src={times} alt='times'/></button>
            <div style={{display: 'flex', width: '40rem', paddingTop: '1rem'}}>
                <button style={buttonStyle} onClick={() => setStatus(<SignIn checkAccounts={checkAccounts}/>)}>Sign In</button>
                <button style={buttonStyle} onClick={() => setStatus(<CreateAccount match={match} updateAccounts={updateAccounts}/>)}>Create Account</button>
            </div>

            <div style={{marginTop: '1rem', width: '40rem'}}>
                {accountStatus}
            </div>
        </div>
    );
}

export default LogIn;
