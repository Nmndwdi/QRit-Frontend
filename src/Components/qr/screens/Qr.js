import React from 'react'
import { useState , useEffect } from 'react';
import HomeService from '../../home/services/home_service';
import Listview from '../../home/widgets/Listview';

function Qr() {

  const buttonsShouldBeShown = false;
  const [data,setData] = useState(null);
  const [userName,setUserName] = useState(null);

  async function RetrieveData(userId)
  {
    const resdata = await HomeService.GetItems(userId);
    setData(resdata);
  }

  useEffect(() => {
    // Get the URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    
    // Get the 'userId' parameter value
    const userId = searchParams.get('userId');
    const userName = searchParams.get('userName');
    setUserName(userName);

    // Check if userId exists and is not empty
    if (userId) {
      // console.log('User ID:', userId);
      if(data==null) RetrieveData(userId);
    } else {
      console.log('User ID not found in URL.');
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-300 px-4 py-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-red-700 mb-6 text-center">
          {userName}
        </h1>
  
        {data !== null ? (
          <Listview
            data={data}
            buttonsShouldBeShown={buttonsShouldBeShown}
            RetrieveData={RetrieveData}
          />
        ) : null}
      </div>
    </>
  );
}

export default Qr