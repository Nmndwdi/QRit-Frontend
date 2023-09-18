import { useState } from 'react';
import AuthService from '../services/auth_service'
import {useNavigate} from "react-router-dom"

function AuthForm({nameShouldBeShown , buttonName}) {
    
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    function goToHome()
    {
      navigate("/home");
    }

    async function handleSubmit(e) {
        
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        if(nameShouldBeShown===true) AuthService.Signup(formJson);
        else
        {
            const res = await AuthService.Signin(formJson);
            if(res!==null && res.status===200) goToHome();
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {nameShouldBeShown===true ?(<><label>
                        <input type='text' name="auth_name" placeholder='Enter you name' autoComplete="off" value={name} onChange={handleNameChange}/>
                    </label><br></br></>):(<></>)}
                    <label>
                        <input type='email' name="auth_email" placeholder='Enter your email' required autoComplete="off" value={email} onChange={handleEmailChange}/>
                    </label>
                    <br></br>
                    <label>
                        <input type='password' name="auth_password" placeholder='Enter you password' required value={password} onChange={handlePasswordChange}/>
                    </label>
                    <br></br>
                    <button type='Submit'>{buttonName}</button>
                </div>
            </form>
        </div>
      )
}

export default AuthForm