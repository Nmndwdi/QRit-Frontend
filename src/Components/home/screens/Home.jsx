import React from 'react'
import { useNavigate } from 'react-router-dom';
import Additemform from '../widgets/Additemform';
import { useState } from 'react';
import UserItems from '../widgets/UserItems';
import HomeService from "../services/home_service";
import QrGenerator from '../../qr/widgets/QrGenerator';

function Home() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('x-user-id');
    console.log("Logout Successful!")
    navigate('/auth');
  };

  const [isItemFormAdded, setIsItemFormAdded] = useState(false);
  const [buttonName,setButtonName] = useState('Add');
  let [isChanged,setIsChanged] = useState(false);

  const handleAddButtonClick = () => {
    if(isItemFormAdded)
    {
      setIsItemFormAdded(!isItemFormAdded);
      setButtonName('Add');
    }
    else
    {
      setIsItemFormAdded(!isItemFormAdded);
      setButtonName('Remove');
    }
  };

  const handleFormSubmit = async (formData) => {
    const res = await HomeService.AddItem(formData);
    if(res===true)
    {
      if(isItemFormAdded)
      {
        setIsItemFormAdded(!isItemFormAdded);
        setButtonName('Add');
      }
      else
      {
        setIsItemFormAdded(!isItemFormAdded);
        setButtonName('Remove');
      }
      // window.location.reload();
      toggleStateChanged(true);
    }
  };

  const toggleStateChanged = (newValue) => {
    setIsChanged(newValue);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
      <UserItems isChanged={isChanged} toggleStateChanged={toggleStateChanged}></UserItems>
      {isItemFormAdded && <Additemform onSubmit={handleFormSubmit} defaultName={''} defaultLink={''}/>}
      <button onClick={handleAddButtonClick}>{buttonName}</button>
      <div style={{height:20}}></div>
      <QrGenerator userId={localStorage.getItem('x-user-id')}></QrGenerator>
    </div>
  )
}

export default Home