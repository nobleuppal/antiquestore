import React, { useState } from 'react';
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';
import times from '../assets/times-circle-solid.svg';
import '../stylesheets/login.css';

const LogIn = ({toLogIn, updateAccounts, checkAccounts, match}) => { 
    
    const [accountStatus, setStatus] = useState(<SignIn checkAccounts={checkAccounts}/>)

    return (  
        <div className='log-in'>
            <img className='close-modal' onClick={toLogIn} src={times} alt='times'/>
            <div className='to-log'>
                <button onClick={() => setStatus(<SignIn checkAccounts={checkAccounts}/>)}>Sign In</button>
                <button onClick={() => setStatus(<CreateAccount match={match} updateAccounts={updateAccounts}/>)}>Create Account</button>
            </div>

            <div className='account-ctn'>
                {accountStatus}
            </div>
        </div>
    );
}

export default LogIn;
