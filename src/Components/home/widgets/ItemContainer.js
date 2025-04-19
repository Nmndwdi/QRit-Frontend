import React from 'react'
import './ItemContainer.css'; 

function ItemContainer({itemName,itemLink}) {
  return (
    <div className="flex flex-col gap-1 mb-2">
      <div className="text-lg font-semibold text-gray-800">{itemName}</div>
      <div>
        <a href={itemLink} className="text-blue-500 underline break-all">{itemLink}</a>
      </div>
    </div>
  )
}

export default ItemContainer