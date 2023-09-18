import React from 'react'
import { useState , useEffect } from 'react';
import HomeService from '../../home/services/home_service';
import Listview from '../../home/widgets/Listview';

function Qr() {

  const buttonsShouldBeShown = false;
  const [data,setData] = useState(null);

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
    <div>
        {data!=null ?(<Listview data={data} buttonsShouldBeShown={buttonsShouldBeShown} RetrieveData={RetrieveData}/>):(<></>)}
    </div>
</>
)
}

export default Qr