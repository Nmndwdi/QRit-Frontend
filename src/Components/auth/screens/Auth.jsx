import React from 'react'
import { useState } from 'react';
import AuthForm from '../widgets/AuthForm';
import QRCodeCanvas from '../widgets/QrCodeCanvas';

function Auth() {

    const [nameShouldBeShown,setNameShouldBeShown] = useState(false);
    const [buttonName,setButtonName] = useState('Signin');

const [auth, setauth] = useState('signin');
  const handleChange = e => {
    const target = e.target;
    if (target.checked) {
      setauth(target.value);
      // console.log(auth);
      if(target.value==='signup')
      {
        setNameShouldBeShown(true);
        setButtonName('Signup');
      }
      else{
        setNameShouldBeShown(false);
        setButtonName('Signin');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
        
        {/* Left: QR or 3D Play Section */}
        <div className="md:w-1/2 w-full p-8 flex items-center justify-center bg-red-50">
          {/* <div className="text-center"> */}
            <QRCodeCanvas></QRCodeCanvas>
            {/* <p className="text-xl font-semibold text-red-500">Just a 3D QR to play</p> */}
          {/* </div> */}
        </div>
  
        {/* Right: Auth Form Section */}
        <div className="md:w-1/2 w-full p-8">
          <h1 className="text-3xl font-bold text-red-600 text-center mb-6">Welcome to Qrit</h1>
          <div className="flex justify-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="auth"
                value="signup"
                checked={auth === 'signup'}
                onChange={handleChange}
                className="accent-red-500"
              />
              <span className="text-sm font-medium">Signup</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="auth"
                value="signin"
                checked={auth === 'signin'}
                onChange={handleChange}
                className="accent-red-500"
              />
              <span className="text-sm font-medium">Signin</span>
            </label>
          </div>
          <AuthForm nameShouldBeShown={nameShouldBeShown} buttonName={buttonName} />
        </div>
      </div>
    </div>
  );    
}

export default Auth