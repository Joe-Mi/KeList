import SigninForm from "../components/SignInForm";
import { useUserContext } from '../context/UserContext.jsx';
import LoginForm from "../components/loginForm";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const [type, setType] = useState('login');
    const { signUp, logIn } = useUserContext();

    function handlesignUp(user){
        signUp(user)
        setType('login');
    }

    function handlelogIn(user){
        logIn(user);
    }

    return (
        <div>
            <button onClick={() => setType(type === 'login' ? 'signup' : 'login')}>
                Switch to {type === 'login' ? 'Signup' : 'Login'}
            </button>
            {type === 'login' 
                ? <LoginForm login={handlelogIn}/> 
                : <SigninForm signIn={handlesignUp}/>}
        </div>
    )
}

export default Landing;