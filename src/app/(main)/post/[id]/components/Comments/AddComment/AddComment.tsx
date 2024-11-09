import React from 'react'

const AddComment = () => {



  return (
    <div>
      <textarea className="w-full rounded border border-slate-400 p-4 disabled:bg-slate-200" placeholder="Write comment"/>
      <button className="w-full rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-80">
        Submit
      </button>
    </div>
  )
}

export default AddComment
