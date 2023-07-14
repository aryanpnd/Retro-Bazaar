import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import './sellButton.css'
import { FilterOutlined, HeartFilled, HeartOutlined, HomeFilled, HomeOutlined, MessageOutlined, SearchOutlined } from '@ant-design/icons';
import { apiURL } from '../../App';
import axios from 'axios';
import ProfileDropdown from '../miscellaneous/dropdowns/ProfileDropdown';
import { useMatch, useNavigate } from 'react-router-dom';
import { productsContext } from '../../contexts/productsContext';
import FilterButtonModal from '../miscellaneous/modal/filterButtonModal';
import Searchbar from '../miscellaneous/searchbar/Searchbar';
import { Slide, toast } from 'react-toastify';

function Navbar() {
    const { setProductData } = useContext(productsContext)
    const navigate = useNavigate()

    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState(false);
    const [userData, setUserData] = useState(undefined)
    const [userName, setUserName] = useState(undefined)

    const home = useMatch('/');
    const wishlist = useMatch('/wishlist');

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


    const appLoads = () => {
        axios.get(`${apiURL}/api/getUserInfo`, { withCredentials: true })
            .then((response) => {
                setUserData(response.data.data.photoURL)
                console.log(response.data.data.photoURL)
                setUserName(response.data.data.name)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        appLoads()
    }, [])

    const handleUnderDev = ()=>{
        toast("🛠️ This feature is still under developent 🛠️", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition:Slide,
            theme: "light",
          })
    }

    return (
        <>
            {/* mobile navbar */}
            <div className="top-nav-container-mob">
                <div className="top-nav-title" style={{ display: search ? 'none' : '' }} > retroBazaar </div>

                <Searchbar search={search} setSearch={setSearch} />

                <span style={{ display: home? search ? 'none' : '':'none' }} onClick={() => setModal(!modal)}>
                    <FilterOutlined style={{ color: '#ffffff', fontSize: '1rem' }} />
                    <FilterButtonModal setProductData={setProductData} modal={modal} setModal={setModal} />
                    Filter
                </span>
            </div>

            <div className={ show ? 'bottom-nav-container-mob slideBottom' : 'bottom-nav-container-mob-none'}>
                <button style={{ background: home ? '#8b2be2' : 'transparent', color: '#ffffff', fontSize: '1.5rem' }} className={`bottom-nav-container-mob-button`} onClick={() => navigate('/')}>
                    {home ? <HomeFilled /> : <HomeOutlined />}
                </button>

                <button className={`bottom-nav-container-mob-button`} onClick={handleUnderDev}>
                    <MessageOutlined style={{ color: '#ffffff', fontSize: '1.5rem' }} />
                </button>

                <button className='sellBtn' onClick={() => navigate('/sell')}>Sell Now</button>

                <button style={{ background: wishlist ? '#8b2be2' : 'transparent', color: '#ffffff', fontSize: '1.5rem' }} className={`bottom-nav-container-mob-button`} onClick={() => navigate('/wishlist')}>
                    {wishlist ? <HeartFilled /> : <HeartOutlined />}
                </button>

                <button className='bottom-nav-container-mob-button'>
                    <ProfileDropdown position={'top'}>
                        <img style={{ width: "2.2rem", borderRadius: "100%" }} src={`${userData ? userData : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`}`} alt='' />
                    </ProfileDropdown>
                </button>
            </div>

            {/* pc navbar */}

            <div div className="navbar-container-pc" >
                <div className="navbar-container-pc-left">
                    retroBazaar
                    <Searchbar />
                </div>

                <div className="navbar-container-pc-center">
                    <div className={`pc-center-navbar-element${home ? '-selected' : ''}`} onClick={() => navigate('/')}>
                        {<HomeFilled style={{ color: 'white', fontSize: '1.4rem' }} />}
                        <div className='pc-navbar-icon-text'>home</div>
                    </div>

                    <div className={`pc-center-navbar-element${wishlist ? '-selected' : ''}`} onClick={() => navigate('/wishlist')}>
                        {<HeartOutlined style={{ color: '#ffffff', fontSize: '1.4rem' }} />}
                        <div className='pc-navbar-icon-text'>wishlist</div>
                    </div>

                    <div className='pc-center-navbar-element' onClick={handleUnderDev}>
                        {<MessageOutlined style={{ color: '#ffffff', fontSize: '1.4rem' }} />}
                        <div className='pc-navbar-icon-text'>chat</div>
                    </div>
                </div>
                <div className="navbar-container-pc-right">
                    <button className='sellBtn' onClick={() => navigate('/sell')}>Sell Now</button>
                    <ProfileDropdown position={'bottom'}>
                        <img style={{ height: "3rem", width: "3rem", borderRadius: "25px", border: "2px solid", transform: 'scale(0.9)' }} src={`${userData ? userData : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`}`} alt='' />
                    </ProfileDropdown>
                </div>
            </div >

        </>
    )
}

export default Navbar