import React from 'react';
import { Button } from '../ui/button';
import { FaSearch, FaUserCircle, FaBell } from 'react-icons/fa';
import logo from "../../assets/img/logo.jpg"

const Header = () => {
  return (
    <header className='flex justify-between items-center py-4 px-8 bg-[#fde4e4]'>
        {/*Logo */}
        <div className='flex items-center gap-2'>
            <img src={logo} className='h-8 w-8' alt="restro logo" />
            <h1 className='text-lg font-semibold text-[#333]'>Restaurant</h1>
        </div>

        {/*Search*/}
        <div className='flex items-center gap-4 bg-[#f1f1f1] rounded-lg px-5 py-2 w-[500px]'>
            <FaSearch className="text-[#333]"/>
              <input placeholder='Search' className='bg-[#f1f1f1] outline-none text-[#333]' />
                 </div>

         {/*Logged */}
         <div className='flex items-center gap-4'>
            <Button variant="outline" className="bg-[#f1f1f1] p-3">
                <FaBell className="text-[#333]" size={20}/>
            </Button>

            <div className='flex items-center gap-3'>
                <FaUserCircle className="text-[#333]" size={40} />
                <div className='flex flex-col items-start'>
                </div>
            </div>
         </div>
    </header>
  )
}

export default Header