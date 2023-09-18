import React from 'react';
// import ItemContainer from './ItemContainer';
import ItemButton from './ItemButton';
import HomeService from '../services/home_service';
import Additemform from './Additemform';
import { useState } from 'react';

const Listview = ({ data , buttonsShouldBeShown , RetrieveData }) => {
    const arrdata = Object.entries(data.items);

    const [editIndex, setEditIndex] = useState(-1);
    const [objectId,setObjectId] = useState(null);

  async function deleteItem(id)
  {
    const res = await HomeService.DeleteItem(id);
    if(res===true) RetrieveData();
  }

  function updateItem(id,index)
  {
    if(editIndex!==index)
    {
      setEditIndex(index);
      setObjectId(id);
    }
    else
    {
      setEditIndex(-1);
      setObjectId(null);
    }
    // console.log(id,"update me!");
  }

  const handleFormSubmit = async (formData) => {
    if(objectId!==null)
    {
      const res = await HomeService.UpdateItem(formData,objectId);
      if(res===true)
      {
        setEditIndex(-1);
        RetrieveData();
      }
    }
    else
    {
      console.log("update id is null");
    }
  };

  return (
    <>
        <p>user items list</p>
        <ul>
          {arrdata.map((item, index) => (
            // <div key={index}>
            //   <ItemContainer itemName={item[1].itemName} itemLink={item[1].itemLink}></ItemContainer>
            //    {shouldBeShown===true ?(<ItemButton onDelete={() => deleteItem(item[1]._id)} onUpdate={() => updateItem(item[1]._id)}></ItemButton>):(<></>)}
            // </div>
            
            <li key={index}>
              {editIndex===index ?<Additemform onSubmit={handleFormSubmit} defaultName={item[1].itemName} defaultLink={item[1].itemLink}></Additemform> :  <><span>Name: {item[1].itemName}</span><br></br><a href={item[1].itemLink}>Link: {item[1].itemLink}</a></>}
              {buttonsShouldBeShown===true ?(<>{editIndex===index ?<></>:<br></br>}<ItemButton onDelete={() => deleteItem(item[1]._id)} onUpdate={() => updateItem(item[1]._id, index)} buttonName={editIndex === index ? 'Cancel' : 'Update'}></ItemButton></>):(<></>)}
            </li>
          ))}
        </ul>
    </>
  );
};

export default Listview;