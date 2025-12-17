import { useState } from 'react';

function LoginForm({ login }) {
    const [errorMsg, seterroMsg] = useState('');
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();

        const user = {name, password};

        login(user);
        seterroMsg('');
    }
    return (
        <div>
            <h3>login</h3>
            <form onSubmit={handleLogin} className='LogInForm'>
                <label htmlFor="name">Username: </label>
                <input id="name" type="text" placeholder='Your user-name'required
                onChange={e => setname(e.target.value)}/>
                <label htmlFor="password">password: </label>
                <input id="password" type="password" 
                onChange={e => setpassword(e.target.value)}required/>
                <button type='submit'>login</button>
                {errorMsg && <p>{errorMsg}</p>}
            </form>
        </div>
    )
}


export default LoginForm;