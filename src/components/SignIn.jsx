import React, {useState} from "react";


const SignIn = ({checkAccounts}) => {

    const [emailValue, setEmail] = useState();
    const [passValue, setPass] = useState();

    return (                
        <form className="sign-in" onSubmit={(e) => checkAccounts(emailValue, passValue, e)}>
            <div className="account-btns">
                <label htmlFor='email'>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} name='email' type='email' id='sign-email'/>
            </div>

            <div className="account-btns">
                <label htmlFor='sign-password'>Password</label>
                <input onChange={(e) => setPass(e.target.value)}  name='sign-password' type='password' id='sign-password'/>
            </div>

            <button className="forgot">Forgot Password?</button>
         
            <button className="submit-account"
                type="submit">
                Sign In
            </button>
        </form>
     );
}
 
export default SignIn;