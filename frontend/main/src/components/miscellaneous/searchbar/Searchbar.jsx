import React, { useEffect, useState } from 'react'
import './Searchbar.css'
import { ArrowRightOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ({ search, setSearch }) {

  const navigate = useNavigate()

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchInput, setSearchInput] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth > 1000);
    };

    handleResize(); // Check initial screen size

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput === null || searchInput.trim() === '') {
      toast.warning(`Your Field is Empty!!!`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return
    }

    navigate(`/search/${searchInput}`)
  }



  return (
    <>
      {
        isSmallScreen ?
          <form className='pc-search-container' onSubmit={handleSearch}>
            <input className='pc-left-navbar-input' placeholder='Search' onChange={handleInput} />

            <button type='submit' style={{ display: searchInput ? '' : 'none' }}
              className={`search-button-pc scaleBigAnim`}>
              <ArrowRightOutlined />
            </button>
          </form>
          :
          <>
            {search ?
              <form className='mob-search-container' onSubmit={handleSearch}>
                <input
                  style={{ height: "70%", width: '60%' }}
                  className='pc-left-navbar-input scaleBigAnim' type="text" placeholder='Search'
                  onChange={handleInput}
                />

                <button type='submit'
                  style={{ display: searchInput ? '' : 'none' }}
                  className='searchBtn scaleBigAnim'>
                  <ArrowRightOutlined />
                </button>
                <CloseOutlined style={{ fontSize: "1.5rem", color: "#00ffff99" }} onClick={() => setSearch(false)} />
              </form>
              :
              <button className='mob-search scaleBigAnim' onClick={() => setSearch(!search)}>
                <SearchOutlined />Search
              </button>
            }
          </>
      }
    </>
  )
}
