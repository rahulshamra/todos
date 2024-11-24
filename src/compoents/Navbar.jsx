import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav  className='flex justify-between bg-slate-700  text-white'>
        <span className='font-bold  mx-4'>iTask</span>
        <ul className='flex gap-10 mx-4' >
            <li className='cursor-pointer hover:font-bold transition-all font-semibold'  >Home</li>
            <li className='cursor-pointer hover:font-bold transition-all font-semibold'> Your task</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
