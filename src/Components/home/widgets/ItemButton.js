import React from 'react'

function ItemButton({onDelete,onUpdate,buttonName}) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onUpdate}
        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
      >
        {buttonName}
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  )
}

export default ItemButton