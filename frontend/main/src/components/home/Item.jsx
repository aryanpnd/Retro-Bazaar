import React, { useState } from 'react'
// import { Heart, HeartOutline } from 'react-ionicons'
import '../../css/Item.css'

function Item({ id, name, description, price, date, image }) {

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
                        {/* {wishlist ? 
                        <Heart
                            color={'#ff2171'}
                            title={"heart"}
                            height="2rem"
                            width="2rem"
                        /> : 
                        <HeartOutline
                            color={'#ff2171'}
                            title={"heart"}
                            height="2rem"
                            width="2rem"
                        />
                        } */}
                    </div>

                </div>
                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", margin: "5%" }}>
                    <div className="item-title">
                        {name}
                    </div>
                    <div className="item-price">
                        {price}
                    </div>
                </div>
                <div className="item-wishlist-button">
                    <button>Chat Now</button>
                </div>
            </div>
        </>
    )
}

export default Item