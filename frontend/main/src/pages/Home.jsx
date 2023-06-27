import React from 'react'
import Products from '../components/home/Products'
import "../css/Home.css"
import Sidebar from '../components/home/Sidebar'


function Home() {

    return (
        <>
            <Sidebar />
            <Products />
        </>
    )
}

export default Home