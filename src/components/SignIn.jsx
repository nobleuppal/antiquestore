import React, {useState} from "react";


const SignIn = ({checkAccounts}) => {

    const [emailValue, setEmail] = useState();
    const [passValue, setPass] = useState();


    const createStyle = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
        marginTop: '7rem',
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
        <form onSubmit={(e) => checkAccounts(emailValue, passValue, e)} style={createStyle}>
            <div style={fieldStyle}>
                <label style={labelStyle} htmlFor='email'>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} style={inputStyle} name='email' type='email' id='sign-email'/>
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle} htmlFor='sign-password'>Password</label>
                <input onChange={(e) => setPass(e.target.value)} style={inputStyle} name='sign-password' type='password' id='sign-password'/>
            </div>

            <button 
                style={{width: '10rem', height: '2rem', backgroundColor: 'var(--Color-Five)', border: '0.25rem solid var(--Color-Four)'}}
                type="submit">
                Sign In
            </button>
        </form>
     );
}
 
export default SignIn;