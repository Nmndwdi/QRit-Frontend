import React from 'react'
import { useState } from 'react';
import Toaster from '../../../common/toaster';

function Additemform({ onSubmit , defaultName , defaultLink}) {

    const [url, setUrl] = useState(defaultLink);
    const [name,setName] = useState(defaultName);
    // const [validationMessage, setValidationMessage] = useState('');

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleNameChange = (e) =>{
        setName(e.target.value);
    }

    const validateLink = () => {
        // Simple URL validation using a regular expression
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

        if (urlPattern.test(url)) {
        // window.location.href = url
        // Valid URL, you can proceed with further actions
            return true; // Redirect to the entered URL
        } else {
        // setValidationMessage('Please enter a valid URL.');
            return false;
        }
    };

    function handleSubmit(e) {
        
        e.preventDefault();

    
        const form = e.target;
        const chk = validateLink();
        if(chk)
        {
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            onSubmit(formJson); 
        }
        else
        {
            Toaster("Enter a valid url","info");
        }
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="item_name"
              placeholder="Site name"
              required
              autoComplete="off"
              value={name}
              onChange={handleNameChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              id="item_link"
              name="item_link"
              placeholder="https://example.com"
              required
              autoComplete="off"
              value={url}
              onChange={handleUrlChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )      
}

export default Additemform