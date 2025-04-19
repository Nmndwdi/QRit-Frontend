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
          <form onSubmit={handleSubmit} className="space-y-4">
            {nameShouldBeShown && (
              <div>
                <input
                  type="text"
                  name="auth_name"
                  placeholder="Enter your name"
                  autoComplete="off"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            )}
      
            <div>
              <input
                type="email"
                name="auth_email"
                placeholder="Enter your email"
                required
                autoComplete="off"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
      
            <div>
              <input
                type="password"
                name="auth_password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
      
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {buttonName}
            </button>
          </form>
        </div>
      );      
}

export default AuthForm