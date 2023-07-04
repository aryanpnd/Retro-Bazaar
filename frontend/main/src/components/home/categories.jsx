import axios from 'axios';
import React, { useState } from 'react'
import { apiURL } from '../../App';

export default function Categories({ availableCategories, setProductData, wishlistData, setWishlistData,setFetching }) {
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selected, setselected] = useState('')

    const handleWheelScroll = (event) => {
        const { deltaX } = event;
        setScrollLeft((prevScrollLeft) => prevScrollLeft + deltaX);
    };

    const toggleCategory = (category) => {
        setFetching(false)
        axios.get(`${apiURL}/api/getWishlist`, { withCredentials: true }).then((data) => {
            setWishlistData(data.data.products)
            axios.get(`${apiURL}/api/products?category=${category}`, { withCredentials: true }).then((data) => {
                setProductData(data.data)
                category === '' ? setselected('') : setselected(data.data[0].category)
                setFetching(true)
            })
        })

    }


    return (
        <>
            <div onWheel={handleWheelScroll} className="products-categories">
                <div className="slider-container">
                    <div className="slider">
                        <button className={selected === '' ? `selected-category-button` : `category-button`} onClick={() => toggleCategory('')}>All Products</button>
                        {
                            availableCategories.map((data, index) => (
                                <button className={data === selected ? `selected-category-button` : `category-button`} key={index} onClick={() => toggleCategory(data)}>{data}</button>
                            ))
                        }
                    </div>
                </div>
            </div></>
    )
}
