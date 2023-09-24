import React from 'react'
import { useNavigate } from 'react-router-dom';
import Additemform from '../widgets/Additemform';
import { useState , useEffect } from 'react';
import UserItems from '../widgets/UserItems';
import HomeService from "../services/home_service";
import QrGenerator from '../../qr/widgets/QrGenerator';
import Toaster from '../../../common/toaster';

function Home() {

  const navigate = useNavigate();
  const userId = localStorage.getItem('x-user-id');

  const logout = () => {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('x-user-id');
    Toaster("Logout Successful!","success");
    navigate('/auth');
  };

  const [isItemFormAdded, setIsItemFormAdded] = useState(false);
  const [buttonName,setButtonName] = useState('Add');
  let [data,setData] = useState(null);

  const RetrieveData = async () => {
    try {
      if(userId!=null)
      {
        const data = await HomeService.GetItems(userId);
        setData(data);
      }
      
    } catch (error) {
      Toaster("Error fetching data","error");
    }
  };

  useEffect(() => {
    RetrieveData();
  }, [data]);

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
        RetrieveData(userId);
      }
      else
      {
        setIsItemFormAdded(!isItemFormAdded);
        setButtonName('Remove');
      }
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
      {data!=null && <UserItems data={data} RetrieveData={RetrieveData}></UserItems>}
      {isItemFormAdded && <Additemform onSubmit={handleFormSubmit} defaultName={''} defaultLink={''}/>}
      {data==null && <br></br>}
      <button onClick={handleAddButtonClick}>{buttonName}</button>
      <div style={{height:20}}></div>
      <QrGenerator userId={localStorage.getItem('x-user-id')}></QrGenerator>
    </div>
  )
}

export default Home