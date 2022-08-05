import React, { useState } from "react";



const CreateAccount = ({updateAccounts, match}) => {

    const [emailValue, setEmail] = useState();
    const [firstValue, setFirst] = useState();
    const [lastValue, setLast] = useState();
    const [phoneValue, setPhone] = useState();
    const [passValue, setPass] = useState();
    const [confirmValue, setConfirm] = useState();

    const createStyle = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
    }

    const fieldStyle = {
        display: 'flex',
        columnGap: '1rem', 
    }

    const inputStyle = {
        width: '15rem',
        border: '0.1rem solid var(--Color-Five)',
        paddingLeft: '0.25rem',
        height: '1.5rem',
    }

    const labelStyle = {
        width: '10rem',
        textAlign: 'left'
    }
    

    return ( 
        <form onSubmit={(e) => updateAccounts(firstValue, lastValue, phoneValue, emailValue, passValue, confirmValue, e)} style={createStyle}>
            <div style={fieldStyle}>
                <label style={labelStyle} htmlFor='email'>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} style={inputStyle} name='email' type='email' id='email'/>
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle} htmlFor='first'>First Name</label>
                <input onChange={(e) => setFirst(e.target.value)} style={inputStyle} name='first' type='text' id='first'/>
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle} htmlFor='last'>Last Name</label>
                <input onChange={(e) => setLast(e.target.value)} style={inputStyle} name='last' type='text' id='last'/>
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle} htmlFor='phone'>Phone Number</label>
                <input onChange={(e) => setPhone(e.target.value)} style={inputStyle} name='phone' type='number' id='phone'/>
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle} htmlFor='password'>Password</label>
                <input onChange={(e) => setPass(e.target.value)} style={inputStyle} name='password' type='password' id='password'/>
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle} htmlFor='confirm-password'>Confirm Password</label>
                <input onChange={(e) => setConfirm(e.target.value)} style={inputStyle} name='confirm-password' type='password' id='confirm-password'/>
            </div>

            <button                 
                style={{width: '10rem', height: '2rem', backgroundColor: 'var(--Color-Five)', border: '0.25rem solid var(--Color-Four)'}}
                type="submit">
                Create Account
            </button>
        </form>
     );
}
 
export default CreateAccount;