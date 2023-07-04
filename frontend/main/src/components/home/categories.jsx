import axios from 'axios';
import React, { useContext, useState } from 'react'
import { apiURL } from '../../App';
import { productsContext } from '../../contexts/productsContext';

export default function Categories({ availableCategories, setProductData, wishlistData, setWishlistData,setFetching }) {
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selected, setselected] = useState('')

    const {category, setCategory} = useContext(productsContext)

    const handleWheelScroll = (event) => {
        const { deltaX } = event;
        setScrollLeft((prevScrollLeft) => prevScrollLeft + deltaX);
    };

    const toggleCategory = async (category) => {
        setFetching(false)
        // await axios.get(`${apiURL}/api/getWishlist`, { withCredentials: true }).then((data) => {
        //     setWishlistData(data.data.products)
        // })
        setCategory(category)
        await axios.get(`${apiURL}/api/products?category=${category}`, { withCredentials: true }).then((data) => {
            setProductData(data.data)
            category === '' ? setselected('') : setselected(data.data[0].category)
            setFetching(true)
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
