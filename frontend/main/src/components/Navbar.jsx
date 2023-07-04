import React, { useEffect, useState } from 'react'
import '../css/Navbar.css'
import '../css/sellButton.css'
import { ArrowDownOutlined, ArrowUpOutlined, FieldTimeOutlined, HeartOutlined, HomeFilled, HomeOutlined, HomeTwoTone, MessageOutlined, SearchOutlined } from '@ant-design/icons';
import { apiURL } from '../App';
import axios from 'axios';

function Navbar() {

    const [active, setActive] = useState("profile");
    const [search, setSearch] = useState(false);
    const [userData, setUserData] = useState(undefined)
    const [userName, setUserName] = useState(undefined)


    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
  
    const controlNavbar = () => {
      if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
          setShow(false); 
        } else { // if scroll up show the navbar
          setShow(true);  
        }
  
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY); 
      }
    };
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', controlNavbar);
  
        // cleanup function
        return () => {
          window.removeEventListener('scroll', controlNavbar);
        };
      }
    }, [lastScrollY]);
  


    function handleHome() {
        setActive("home")
    }
    function handleAbout() {
        setActive("about")
    }
    function handleCart() {
        setActive("cart")
    }
    function handleProfile() {
        setActive("profile")
    }
    function handleSoon() {
        setActive("soon")
    }

    function toggleSearch() {
        setSearch(!search)
    }

    const appLoads = () => {
        axios.get(`${apiURL}/api/getUserInfo`, { withCredentials: true })
            .then((response) => {
                setUserData(response.data.data.photoURL)
                setUserName(response.data.data.name)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        appLoads()
    }, [])


    return (
        <>
            {/* mobile navbar */}
            <div className="top-nav-container-mob">
                {search ? <input className='top-nav-mob-input' placeholder='Search Around You' />
                    :
                    <>
                        <SearchOutlined
                            style={{ color: '#00ADB5', fontSize: '2rem' }}
                            onClick={toggleSearch}
                        />

                        <div className="top-nav-title"
                            onClick={toggleSearch}
                        >
                            retroBazaar
                        </div>
                    </>
                }
            </div>
            <div className={show  ? 'bottom-nav-container-mob' : 'bottom-nav-container-mob-none'}>
                <ul>
                    <li className={`bottom-nav-list ${active === "home" ? "active" : ""} `} onClick={handleHome}>
                        <div className='linkdiv'>
                            <span className='bottom-nav-icon'>
                                <HomeOutlined style={{ color: '#ffffff', fontSize: '1.5rem' }}
                                />
                            </span>
                            <span className='text'>Home</span>
                        </div>
                    </li>
                    <li className={`bottom-nav-list ${active === "soon" ? "active" : ""} `} onClick={handleSoon}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'>
                                <FieldTimeOutlined style={{ fontSize: '1.5rem' }} />
                            </span>
                            <span className='text'>Soon</span>
                        </span>
                    </li>
                    <li className={`bottom-nav-list ${active === "about" ? "active" : ""} `} onClick={handleAbout}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'>
                                <HeartOutlined style={{ fontSize: '1.5rem' }} />
                            </span>
                            <span className='text'>Wishlist</span>
                        </span>
                    </li>
                    <li className={`bottom-nav-list ${active === "profile" ? "active" : ""} `} onClick={handleProfile}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'>
                                <img style={{ height: "2.2rem", width: "2.2rem", borderRadius: "100%" }} src={`${userData ? userData : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`}`} alt='' />
                            </span>
                            <span className='text'>Reddy</span>
                        </span>
                    </li>
                </ul>
            </div>

            {/* pc navbar */}

            <div div className="navbar-container-pc" >
                <div className="navbar-container-pc-left">
                    retroBazaar
                    <input className='pc-left-navbar-input' placeholder='Search' />
                </div>

                <div className="navbar-container-pc-center">
                    <div className='pc-center-navbar-element-selected'>
                        {<HomeFilled style={{ color: 'white', fontSize: '1.4rem' }} />}
                        <div className='pc-navbar-icon-text'>home</div>
                    </div>
                    <div className='pc-center-navbar-element'>
                        {<MessageOutlined style={{ color: '#ffffff', fontSize: '1.4rem' }} />}
                        <div className='pc-navbar-icon-text'>chat</div>
                    </div>
                    <div className='pc-center-navbar-element'>
                        {<HeartOutlined style={{ color: '#ffffff', fontSize: '1.4rem' }} />}
                        <div className='pc-navbar-icon-text'>wishlist</div>
                    </div>
                </div>
                <div className="navbar-container-pc-right">
                    <button className='sellBtn'>Sell Now</button>
                    <img style={{ height: "3rem", width: "3rem", borderRadius: "25px", border: "2px solid" }} src={`${userData ? userData : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`}`} alt='' />
                </div>
            </div >

        </>
    )
}

export default Navbar