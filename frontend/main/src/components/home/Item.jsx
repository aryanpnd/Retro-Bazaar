import React, { useEffect, useState } from 'react'
// import { Heart, HeartOutline } from 'react-ionicons'
import '../../css/Item.css'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import axios from 'axios'
import { apiURL } from '../../App'
import { ClipLoader, ClockLoader } from 'react-spinners'

function Item({ id, name, description, price, category, date, image, userImage, userName, wishlistData, sendToast }) {

    const [wishlist, setWishlist] = useState(false)
    const [spinnerLoading, setSpinnerLoading] = useState(false)

    useEffect(() => {
        const isExists = wishlistData.find(item => item._id === id)
        if (isExists) {
            setWishlist(true)
        }
        else {
            setWishlist(false)
        }
    }, [])


    async function toggleWishlist() {
        setSpinnerLoading(true)

        if (!wishlist) {
            await axios.post(`${apiURL}/api/addToWishlist`, { "productId": id }, { withCredentials: true }).then((res) => {
                setWishlist(true)
                sendToast(`${name} ${res.data}`, true)
                setSpinnerLoading(false)
            })
        }
        else {
            console.log(`${apiURL}/api/deleteOneFromWishlist`)
            await axios.delete(`${apiURL}/api/deleteOneFromWishlist?productId=${id}`, { withCredentials: true },).then((res) => {
                setWishlist(false)
                sendToast(`${name} ${res.data}`, false)
            })
            setSpinnerLoading(false)
        }
    }

    return (
        <>
            <div className="item-container">
                <div className="item-img-wrapper">
                    <img
                        className='item-img'
                        src={image}
                        alt=''
                    />
                    <div className='item-img-wishlist' onClick={toggleWishlist}>
                        {wishlist ? spinnerLoading ?
                            <ClockLoader
                                color={'grey'}
                                loading={true}
                                size={20}
                                speedMultiplier={5}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> :
                            <HeartFilled style={{ color: '#bf0b0b', fontSize: "1.8rem" }} /> :
                            spinnerLoading ?
                            <ClockLoader
                                color={'grey'}
                                loading={true}
                                size={20}
                                speedMultiplier={5}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> :
                            <HeartFilled style={{ color: 'grey', fontSize: "1.8rem" }} />
                        }
                        {

                        }
                    </div>

                </div>
                <div className='item-title-header-container'>
                    <div className="item-title">
                        {name}
                    </div>
                    <div className="item-price">
                        {price}
                    </div>
                </div>
                <div className="item-description-container">
                    <div className='item-description'>{description}</div>
                </div>
                <div className="item-date-and-category-container">
                    <div className='item-category'>{category}</div>
                    <div className='item-date'>{date.split('T')[0]}</div>
                </div>
                <div className="item-Bottom-container">
                    <button className='item-view-now-btn' >Chat Now</button>
                    <img className='item-user-profile' style={{ height: "2.2rem", width: "2.2rem", borderRadius: "100%", border: '1px solid' }} src={`${userImage ? userImage : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`}`} alt='' />
                </div>
            </div>
        </>
    )
}

export default Item