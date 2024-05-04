import React from 'react'

const footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
        <div className='logo font-bold text-2xl'>
          <span className='text-red-400'>| </span>
          Spy
          <span className='text-red-400'>PASS |</span>
          </div>
      <div className='flex justify-center items-center '>created with <img className='w-4 mx-2' src="./icons/heartsolid.svg" alt="heart" /> by Moin-Khan</div>
    </div>
  )
}

export default footer
