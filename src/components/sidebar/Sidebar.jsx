import { MdLogout } from "react-icons/md"; 
import { FaHome } from "react-icons/fa"; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu, GiCardboardBox, GiPerson } from 'react-icons/gi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Sahifani o'zgartirish uchun useNavigate hook'idan foydalanamiz.

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('nav')) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    
    navigate('/auth/login');
  };

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 z-50 w-full h-16 bg-gray-900 transition-transform duration-300 ${
          isOpen ? 'translate-x-64' : 'translate-x-0'
        } flex items-center justify-between px-4`}
      >
        <button
          className="text-white text-2xl"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      <Link to='/'>
      <button className="flex items-center space-x-2 hover:text-gray-300 text-xl text-white gap-2 border-2 px-2 py-1 rounded-lg">
          Home <FaHome className="text-2xl text-white" />
        </button>
      </Link>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 from-green-400 via-blue-500 to-purple-600 p-6 shadow-lg text-white text-lg w-64 transform sidebar ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 flex flex-col`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        ></button>

        <ul className="mt-16 space-y-4">
          <li>
            <Link to="/dashboard/profile" onClick={toggleSidebar} className="flex items-center space-x-2 hover:text-gray-300 text-xl">
              <GiPerson className="text-2xl" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users" className="flex items-center space-x-2 hover:text-gray-300 text-xl">
              <GiCardboardBox className="text-2xl" />
              <span>Users</span>
            </Link>
          </li>
        </ul>
{/* 
        <button
          className="flex items-center space-x-2 hover:text-gray-300 text-xl text-white mt-auto pb-4"
          onClick={handleLogout} 
        >
          <MdLogout className="text-2xl" />
          <span>Logout</span>
         </button>  */}
      </div>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
          style={{ cursor: 'pointer' }}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
