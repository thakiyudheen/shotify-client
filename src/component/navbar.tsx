// src/components/NavBar.tsx
import React from 'react';
import { ModeToggle } from './ui/mode-toggle';
import { FaLink } from "react-icons/fa";

const NavBar: React.FC = () => {


  return (
    <nav className=" max-w-9xl shadow-md">
    
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary flex justify-between items-center dark:text-gray-500"><FaLink className='text-[90%] text-[blue]' /> &nbsp;Shotify</h1>
            </div>
          </div>
          <div>
          <ModeToggle/>
          </div>
         
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
