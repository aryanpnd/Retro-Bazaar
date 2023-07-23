import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Item from '../miscellaneous/productCards/Item';
import axios from 'axios';
import { apiURL } from '../../App';
import FilterButtonModal from '../miscellaneous/modal/filterButtonModal';
import ProductsCardSkeleton from '../miscellaneous/productsCardSkeleton/productsCardSkeleton';
import { DeleteFilled, FilterOutlined } from '@ant-design/icons';
import Lottie from "lottie-react";
import noResultFound from "../../assets/lottie/noResultFound.json";

import './SearchPage.css'
import { toast } from 'react-toastify';

export default function SearchPage() {

    const params = useParams()

    const [searchedProducts, setSearchedProducts] = useState([])
    const [searchedProductsCount, setSearchedProductsCount] = useState(0)
    const [wishlistData, setWishlistData] = useState()
    const [fetching, setFetching] = useState(false)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        setFetching(false)
        axios.get(`${apiURL}/api/getWishlist`, { withCredentials: true }).then((data) => {
            setWishlistData(data.data.products)
            setFetching(true)
        })
        axios.get(`${apiURL}/api/products/search?q=${params.query}&sortby=date&order=-1`, { withCredentials: true }).then((data) => {
            setSearchedProducts(data.data.products)
            setSearchedProductsCount(data.data.count)
            setFetching(true)
        })
    }, [params])

    const sendToast = (name, type) => {
        type ?
            toast.success(`${name}`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            :
            toast.error(`${name}`, {
                icon: <DeleteFilled style={{ color: "#c91d23" }} />,
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
    }

    return (


        <>

            <div className="products-container">

                <div className="search-head">
                    <div className="results-container">
                        <span style={{ marginRight: '10%', fontWeight: '900', background: "grey", padding: "5px", borderRadius: "8px" }}>
                            {searchedProductsCount + " "}results found for "{params.query}"
                        </span>
                    </div>

                    <div className='filter-container-search '>
                        <button className='filter-button-search' onClick={() => setModal(!modal)}>
                            <FilterOutlined /> Filter
                        </button>
                        <FilterButtonModal setProductData={setSearchedProducts} modal={modal} setModal={setModal} search={true} searchQuery={params.query} />
                    </div>
                </div>

                {
                    <div className="products-list">
                        <div className="products-card-wrapper">
                            {fetching ? searchedProducts.length === 0 ?
                                <div className="lottie-loader-inner-wrapper">
                                    <Lottie animationData={noResultFound} loop={true} />
                                    <h2 style={{ textAlign: 'center' }}>No results found for "{params.query}"</h2>
                                </div>
                                :
                                searchedProducts.map(p =>
                                    <Item
                                        key={p._id}
                                        productId={p._id}
                                        id={p._id}
                                        name={p.title}
                                        description={p.description}
                                        price={p.price}
                                        date={p.date}
                                        location={p.location}
                                        image={p.thumbnail}
                                        category={p.category}
                                        userImage={p.postedBy.photoURL}
                                        userName={p.postedBy.name}
                                        wishlistData={wishlistData}
                                        sendToast={sendToast}
                                    />
                                )
                                :
                                <ProductsCardSkeleton count={9} />
                            }
                        </div>
                    </div>
                }

            </div>
        </>
    )
}
