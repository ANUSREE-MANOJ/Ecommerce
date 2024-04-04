import React from 'react'
import { useNavigate } from 'react-router-dom'

function Notfound() {
  const naviagte=useNavigate()
  return (
    <div className='flex flex-col items-center mt-[200px] '>
      <img src="images\sad.png" alt="not foun image"  className='h-[150px] w-[200px] relative bottom-10'/>
      <h1 className='text-blue-500 text-4xl '>PAGE NOT FOUND</h1>
      <p className='pt-4'>We looked everywhere for this page.</p>
      <p className='pt-1'>Are you sure the website URL is correct?</p>
      <p className='pt-1'>Get in touch with the site owner.</p> <br />
     <button className='border p-2 rounded-full border-blue-500 text-blue-500'
     onClick={()=>naviagte('/')}>Go back to home</button>
    </div>
  )
}

export default Notfound