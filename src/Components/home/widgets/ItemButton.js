import React from 'react'

function ItemButton({onDelete,onUpdate,buttonName}) {
  return (
    <>
        <button onClick={onUpdate}>{buttonName}</button>
        <button onClick={onDelete}>Delete</button>
    </>
  )
}

export default ItemButton