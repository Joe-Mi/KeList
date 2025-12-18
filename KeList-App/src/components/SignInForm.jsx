import { useState } from 'react';


function SigninForm({ signIn }) {
    const [errorMsg, seterroMsg] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone_num, setphone_num] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');   

    function handelSignin(e) {
        e.preventDefault();

        if(password !== confirmPassword) {
            seterroMsg('error passwords dont match.')
            return
        }

        const user = {name, email, phone_num, password};

        signIn(user);
        seterroMsg('');
    }

    return (
        <div>
            <h3>Sign In</h3>
            <form onSubmit={handelSignin} className='landingForm'>
                <label htmlFor="name">Username: </label>
                <input id="name" type="text" placeholder='Your user-name'required
                onChange={e => setname(e.target.value)}/>
                <label htmlFor="phone_num">phone number: </label>
                <input id="phone_num" type="text" placeholder='XXX-XXX-XX'
                onChange={e => setphone_num(e.target.value)} required/>
                <label htmlFor="email">email: </label>
                <input id="email" type="email" 
                onChange={e => setemail(e.target.value)} required/>
                <label htmlFor="password">password: </label>
                <input id="password" type="password" 
                onChange={e => setpassword(e.target.value)}required/>
                <label htmlFor="confirm_password">confirm password: </label>
                <input id="confirm_passInput" type="password" 
                onChange={e => setconfirmPassword(e.target.value)}required/>
                <button type='submit'>Sign Up</button>
                {errorMsg && <p>{errorMsg}</p>}
            </form>
        </div>
    );
}


export default SigninForm;