import React, { useEffect, useState } from 'react'
import './Searchbar.css'
import { ArrowRightOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
export default function ({ search, setSearch }) {

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

  const handleSearch = (e)=>{
    setSearchInput(e.target.value)
    console.log(searchInput);
  }


  return (
    <>
      {
        isSmallScreen ?
        <div className='pc-search-container'>
          <input className='pc-left-navbar-input' placeholder='Search' onChange={handleSearch}/>
          <button style={{display:searchInput?'':'none'}} className= {`search-button-pc scaleBigAnim`}><ArrowRightOutlined/></button>
        </div>
          :
          <>
            {search ?
              <div className='mob-search-container' >
                <input style={{ height: "70%",width:'60%' }} className='pc-left-navbar-input' type="text" placeholder='Search' onChange={handleSearch}/>
                <button style={{display:searchInput?'':'none'}} className='searchBtn scaleBigAnim'><ArrowRightOutlined/></button>
                <CloseOutlined style={{fontSize:"1.5rem",color:"#00ffff99"}} onClick={()=>setSearch(false)}/>
              </div>
              :
              <button className='mob-search' onClick={() => setSearch(!search)}>
                <SearchOutlined />Search
              </button>
            }
          </>
      }
    </>
  )
}
