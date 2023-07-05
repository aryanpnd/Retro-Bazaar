import React, { useEffect, useState } from 'react'
import './ProfileDropdown.css';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import axios from 'axios';
import { apiURL } from '../../../App';

export default function ProfileDropdown({ children, position }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownMenuStyle = {

  };

  if (position === 'bottom') {
    dropdownMenuStyle.top = '100%';
  } else {
    dropdownMenuStyle.bottom = '100%';
  }


  const signOut = () => {
    axios.get(`${apiURL}/api/signOutUser`, { withCredentials: true })
      .then(() => {
        window.location.href = '/auth'
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={{ cursor: 'pointer'}} className={`dropdown ${isOpen ? 'open' : ''}`}>
      <div style={{ borderRadius: '25px' }} onClick={toggleDropdown}>
        {children}
      </div>
      <div style={dropdownMenuStyle} className="dropdown-menu">
        <button ><span> <UserOutlined /> </span> My profile</button>
        <button onClick={signOut} ><span> <LogoutOutlined /> </span>Logout</button>
      </div>
    </div>
  )
}
