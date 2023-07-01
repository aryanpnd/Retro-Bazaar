import React, { useState } from 'react'
// import { Heart, HeartOutline } from 'react-ionicons'
import '../../css/Item.css'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

function Item({ name, description, price, category, date, image, userImage,userName }) {

    const [wishlist, setWishlist] = useState(false)

    function toggleWishlist() {
        setWishlist(!wishlist)
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
                        {wishlist ?
                            <HeartFilled style={{ color: 'red' }}
                                color={'red'}
                                title={"heart"}
                                height="2rem"
                                width="2rem"
                            /> :
                            <HeartOutlined
                                color={'#ff2171'}
                                title={"heart"}
                                height="2rem"
                                width="2rem"
                            />
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
                    <button className='item-view-now-btn'>Chat Now</button>
                    <img className='item-user-profile' style={{ height: "2.2rem", width: "2.2rem", borderRadius: "100%" }} src={`${userImage ? userImage : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`}`} alt='' />
                </div>
            </div>
        </>
    )
}

export default Item