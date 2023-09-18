import React from 'react'
import './ItemContainer.css'; 

function ItemContainer({itemName,itemLink}) {
  return (
    <>
        <div className='mainName'>{itemName}</div>
        <div className='mainLink'>{itemLink}</div>
    </>
  )
}

export default ItemContainer