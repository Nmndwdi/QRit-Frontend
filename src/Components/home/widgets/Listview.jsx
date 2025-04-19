import React from 'react';
// import ItemContainer from './ItemContainer';
import ItemButton from './ItemButton';
import HomeService from '../services/home_service';
import Additemform from './Additemform';
import { useState } from 'react';

const Listview = ({ data , buttonsShouldBeShown ,RetrieveData }) => {
    const arrdata = Object.entries(data.items);
    const userId = localStorage.getItem('x-user-id');

    const [editIndex, setEditIndex] = useState(-1);
    const [objectId,setObjectId] = useState(null);

  async function deleteItem(id)
  {
    const res = await HomeService.DeleteItem(id);
    if(res===true) RetrieveData(userId);
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
        RetrieveData(userId);
      }
    }
    else
    {
      console.log("update id is null");
    }
  };

  return (
    <ul className="space-y-4 w-full">
      {arrdata.map((item, index) => (
        <li
          key={index}
          className="bg-white rounded-xl p-4 shadow flex justify-between items-start"
        >
          <div className="flex-1">
            {editIndex === index ? (
              <Additemform
                onSubmit={handleFormSubmit}
                defaultName={item[1].itemName}
                defaultLink={item[1].itemLink}
              />
            ) : (
              <>
                <span className="block text-lg font-medium">Name: {item[1].itemName}</span>
                <a
                  href={item[1].itemLink}
                  className="text-blue-500 underline break-all"
                >
                  Link: {item[1].itemLink}
                </a>
              </>
            )}
          </div>
  
          {buttonsShouldBeShown && (
            <div className="ml-4 mt-2">
              <ItemButton
                onDelete={() => deleteItem(item[1]._id)}
                onUpdate={() => updateItem(item[1]._id, index)}
                buttonName={editIndex === index ? 'Cancel' : 'Update'}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  )  
};

export default Listview;