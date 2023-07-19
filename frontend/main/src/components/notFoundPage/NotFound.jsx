import React from 'react'
import notFound from '../../assets/img/notFound.png'
import logo from '../../assets/img/logo.png'
import './notfound.css'
import Navbar from '../navbar/Navbar'

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className='pnf-main'>
                <img draggable={false} src={notFound} alt="" />
                <div className='pfp-text'>
                    <span>Can't find the Page you're looking for </span>
                </div>

                <a style={{ position: 'absolute', bottom: '1px', right: "1px",textDecoration:"none",color: "white",fontSize: "0.7rem"}} href="https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_13315300.htm#query=404%20page&position=0&from_view=keyword&track=ais">Image by storyset on Freepik</a> 
            </div>
        </>
    )
}
