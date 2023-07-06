import React, { useContext, useEffect, useState } from 'react'
import '../../css/Navbar.css'
import '../../css/sellButton.css'
import { FilterOutlined, HeartOutlined, HomeFilled, HomeOutlined, MessageOutlined, SearchOutlined } from '@ant-design/icons';
import { apiURL } from '../../App';
import axios from 'axios';
import ProfileDropdown from '../miscellaneous/dropdowns/ProfileDropdown';
import { useMatch, useNavigate } from 'react-router-dom';
import { productsContext } from '../../contexts/productsContext';
import FilterButtonModal from '../miscellaneous/filterButtonModal/filterButtonModal';
import Searchbar from '../miscellaneous/searchbar/Searchbar';

function Navbar() {
    const { productData, setProductData } = useContext(productsContext)
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


    return (
        <>
            {/* mobile navbar */}
            <div className="top-nav-container-mob">
                <div className="top-nav-title" style={{ display: search ? 'none' : '' }} > retroBazaar </div>

                <Searchbar search={search} setSearch={setSearch} />
                {/* <div style={{width:'29%',height:'100%',display:'flex',justifyContent:'center',alignItems:"center"}}>
                </div> */}

                <MessageOutlined style={{ display: search ? 'none' : '', color: 'aqua' }} />
            </div>

            <div className={show ? 'bottom-nav-container-mob' : 'bottom-nav-container-mob-none'}>
                <ul>
                    <li className={`bottom-nav-list ${home ? "active" : ""} `} onClick={() => navigate('/')}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'>
                                <HomeOutlined style={{ color: '#ffffff', fontSize: '1.5rem' }} />
                            </span>
                            <span className='text'>Home</span>
                        </span>
                    </li>

                    <li >
                        <span className='linkspan'>
                            <span className={wishlist ? 'filterBtn-mob-none' : ''} onClick={() => setModal(!modal)}>
                                <FilterOutlined style={{ color: '#ffffff', fontSize: '1.5rem' }} />
                            </span>
                            <FilterButtonModal setProductData={setProductData} modal={modal} setModal={setModal} />
                        </span>
                    </li>

                    <li >
                        <span className='linkspan'>
                            <button className='sellBtn'>Sell Now</button>
                        </span>
                    </li>

                    <li className={`bottom-nav-list ${wishlist ? "active" : ""} `} onClick={() => navigate('/wishlist')}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'>
                                <HeartOutlined style={{ fontSize: '1.5rem' }} />
                            </span>
                            <span className='text'>Wishlist</span>
                        </span>
                    </li>
                    <li>
                        <span className='linkspan'>
                            <ProfileDropdown position={'top'}>
                                <img style={{ height: "2.2rem", width: "2.2rem", borderRadius: "100%" }} src={`${userData ? userData : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`}`} alt='' />
                            </ProfileDropdown>
                        </span>
                    </li>
                </ul>
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

                    <div className='pc-center-navbar-element'>
                        {<MessageOutlined style={{ color: '#ffffff', fontSize: '1.4rem' }} />}
                        <div className='pc-navbar-icon-text'>chat</div>
                    </div>
                </div>
                <div className="navbar-container-pc-right">
                    <button className='sellBtn'>Sell Now</button>
                    <ProfileDropdown position={'bottom'}>
                        <img style={{ height: "3rem", width: "3rem", borderRadius: "25px", border: "2px solid" }} src={`${userData ? userData : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`}`} alt='' />
                    </ProfileDropdown>
                </div>
            </div >

        </>
    )
}

export default Navbar