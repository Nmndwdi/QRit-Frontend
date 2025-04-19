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
  const userName = localStorage.getItem('x-user-name')?.toUpperCase();

  const logout = () => {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('x-user-id');
    localStorage.removeItem('x-user-name');
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
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-300 px-4 py-6">
  
      {/* Welcome Message */}
      <div className="w-full text-center mb-4">
        <h1 className="text-2xl font-bold text-red-700">Welcome, {userName}</h1>
      </div>
  
      {/* Control Panel Row (Small screen: horizontal row) */}
      <div className="flex flex-col md:hidden justify-between items-center w-full gap-4 mb-4">
        <div className="w-full flex justify-between items-center">
          <button
            onClick={handleAddButtonClick}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            {buttonName}
          </button>
  
          <div className="w-24 h-24 mx-2">
            <QrGenerator userId={userId} userName={userName} />
          </div>
  
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
  
        {isItemFormAdded && (
          <div className="w-full">
            <Additemform onSubmit={handleFormSubmit} defaultName={''} defaultLink={''} />
          </div>
        )}
      </div>
  
      {/* Larger screen layout */}
      <div className="hidden md:flex flex-row justify-between items-start w-full max-w-6xl mx-auto gap-4">
        
        {/* Left Column */}
        <div className="w-2/3 flex flex-col gap-4">
          <div>
            <button
              onClick={handleAddButtonClick}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              {buttonName}
            </button>
          </div>
  
          {isItemFormAdded && (
            <Additemform onSubmit={handleFormSubmit} defaultName={''} defaultLink={''} />
          )}
  
          {data !== null && (
            <UserItems data={data} RetrieveData={RetrieveData} />
          )}
        </div>
  
        {/* Right Column (Sticky) */}
        <div className="w-1/3 flex flex-col items-center gap-4 sticky top-10">
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-full md:w-auto"
          >
            Logout
          </button>
          <div className="w-30 h-40">
            <QrGenerator userId={userId} userName={userName} />
          </div>
        </div>
  
      </div>
  
      {/* Links section for small screen (below controls) */}
      <div className="md:hidden mt-12">
        {data !== null && (
          <UserItems data={data} RetrieveData={RetrieveData} />
        )}
      </div>
  
    </div>
  )    
}

export default Home