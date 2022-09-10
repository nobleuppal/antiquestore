import React, { useState } from "react";



const CreateAccount = ({updateAccounts, match}) => {

    const [emailValue, setEmail] = useState();
    const [firstValue, setFirst] = useState();
    const [lastValue, setLast] = useState();
    const [phoneValue, setPhone] = useState();
    const [passValue, setPass] = useState();
    const [confirmValue, setConfirm] = useState();

    return ( 
        <form className="create-acc" onSubmit={(e) => updateAccounts(firstValue, lastValue, phoneValue, emailValue, passValue, confirmValue, e)}>
            <div className="account-btns">
                <label htmlFor='email'>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} name='email' type='email' id='email'/>
            </div>

            <div className="account-btns">
                <label htmlFor='first'>First Name</label>
                <input onChange={(e) => setFirst(e.target.value)} name='first' type='text' id='first'/>
            </div>

            <div className="account-btns">
                <label  htmlFor='last'>Last Name</label>
                <input onChange={(e) => setLast(e.target.value)} name='last' type='text' id='last'/>
            </div>

            <div className="account-btns">
                <label htmlFor='phone'>Phone Number</label>
                <input onChange={(e) => setPhone(e.target.value)} name='phone' type='number' id='phone'/>
            </div>

            <div className="account-btns">
                <label htmlFor='password'>Password</label>
                <input onChange={(e) => setPass(e.target.value)} name='password' type='password' id='password'/>
            </div>

            <div className="account-btns">
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input onChange={(e) => setConfirm(e.target.value)} name='confirm-password' type='password' id='confirm-password'/>
            </div>

            <button className="submit-account"
                type="submit">
                Create Account
            </button>
        </form>
     );
}
 
export default CreateAccount;