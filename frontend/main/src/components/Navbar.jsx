import React, { useState } from 'react'
import '../css/Navbar.css'
import { CartOutline, ChatbubblesOutline, HeartOutline, HomeOutline, SearchOutline, TimeOutline } from 'react-ionicons'

function Navbar() {

    const [active, setActive] = useState("profile");
    const [search, setSearch] = useState(false);


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


    return (
        <>
            {/* mobile navbar */}
            <div className="top-nav-container-mob">
                {search ? <input className='top-nav-mob-input' placeholder='Search Around You' />
                    :
                    <>
                        <SearchOutline
                            color={'#00ADB5'}
                            title={"search"}
                            height="2rem"
                            width="2rem"
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
            <div className="bottom-nav-container-mob">
                <ul>
                    <li className={`bottom-nav-list ${active === "home" ? "active" : ""} `} onClick={handleHome}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'><HomeOutline
                                color={'#ffffff'}
                                title={"home"}
                                height="1.5rem"
                                width="1.5rem"
                            /></span>
                            <span className='text'>Home</span>
                        </span>
                    </li>
                    <li className={`bottom-nav-list ${active === "soon" ? "active" : ""} `} onClick={handleSoon}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'><TimeOutline
                                color={'#ffffff'}
                                title={"home"}
                                height="1.5rem"
                                width="1.5rem"
                            /></span>
                            <span className='text'>Soon</span>
                        </span>
                    </li>
                    <li className={`bottom-nav-list ${active === "cart" ? "active" : ""} `} onClick={handleCart}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'><CartOutline
                                color={'#24ff65'}
                                title={"home"}
                                height="1.5rem"
                                width="1.5rem"
                            /></span>
                            <span className='text'>Cart</span>
                        </span>
                    </li>
                    <li className={`bottom-nav-list ${active === "about" ? "active" : ""} `} onClick={handleAbout}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'><HeartOutline
                                color={'#ff2171'}
                                title={"home"}
                                height="1.5rem"
                                width="1.5rem"
                            /></span>
                            <span className='text'>Wishlist</span>
                        </span>
                    </li>
                    <li className={`bottom-nav-list ${active === "profile" ? "active" : ""} `} onClick={handleProfile}>
                        <span className='linkspan'>
                            <span className='bottom-nav-icon'>
                                <img style={{ height: "2.2rem", width: "2.2rem", borderRadius: "100%" }} src={require("../assets/img/lpuLogo.png")} alt='' />
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
                    <div className='pc-center-navbar-element'>
                        <span className='icon'>
                            <HomeOutline
                                color={'#f4e17c'}
                                title={"home"}
                                height="2rem"
                                width="2rem"
                            /></span>
                        <span className='pc-navbar-icon-text'>home</span>
                    </div>
                    <div className='pc-center-navbar-element'>
                        <span className='icon'>
                            <ChatbubblesOutline
                                color={'#518cdf'}
                                title={"Sell"}
                                height="2rem"
                                width="2rem"
                            /></span>
                        <span className='pc-navbar-icon-text'>chat</span>
                    </div>
                    <div className='pc-center-navbar-element'>
                        <HeartOutline
                            color={'#ff2171'}
                            title={"wishlist"}
                            height="2.2rem"
                            width="2.2rem"
                        />
                        <span className='pc-navbar-icon-text'>wishlist</span>
                    </div>
                    <div className='pc-center-navbar-element'>
                        <CartOutline
                            color={'#24ff65'}
                            title={"home"}
                            height="2.2rem"
                            width="2.2rem"
                        /><span className='pc-navbar-icon-text'>cart</span>
                    </div>
                </div>
                <div className="navbar-container-pc-right">
                    <img style={{ height: "3rem", width: "3rem" }} src={require("../assets/img/lpuLogo.png")} alt='' />
                </div>
            </div >
        </>
    )
}

export default Navbar