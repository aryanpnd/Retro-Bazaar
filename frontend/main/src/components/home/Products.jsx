import React, { useEffect, useState } from 'react'
import "../../css/Products.css"
import data from '../../assets/data/FakeData.json'
import Item from './Item'
import axios from 'axios'
import { apiURL } from '../../App'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Categories from './categories'
import { DeleteFilled,FilterOutlined } from '@ant-design/icons'
import ProductsCardSkeleton from '../miscellaneous/productsCardSkeleton/productsCardSkeleton'
import FilterButtonModal from '../miscellaneous/filterButtonModal/filterButtonModal'

function Products() {

    const [productData, setProductData] = useState([])
    const [availableCategories, setavailableCategories] = useState([])
    const [totalProducts, settotalProducts] = useState(0)
    const [wishlistData, setWishlistData] = useState()
    const [fetching, setFetching] = useState(false)

    const fetchData = async () => {
        // axios.get(`${apiURL}/api/totalproducts`, { withCredentials: true }).then((data) => {
        //     settotalProducts(data.data)
        // })
        await axios.get(`${apiURL}/api/products`, { withCredentials: true }).then((data) => {
            setProductData(data.data)
        })
        await axios.get(`${apiURL}/api/getProductSpecificField?field=category&distinct=true`, { withCredentials: true }).then((data) => {
            setavailableCategories(data.data)
        })
        // fecting wishlist
        await axios.get(`${apiURL}/api/getWishlist`, { withCredentials: true }).then((data) => {
            setWishlistData(data.data.products)
            setFetching(true)
        })
    }
    useEffect(() => {
        fetchData()
    }, [])

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

                <div className='product-list-head'>
                    <Categories setFetching={setFetching} wishlistData={wishlistData} setWishlistData={setWishlistData}
                        setProductData={setProductData} availableCategories={availableCategories} />

                    <div className='filter-container'>
                        <FilterButtonModal setProductData={setProductData}>
                            {(openModal) => (
                                <button className='filter-button' onClick={openModal}>
                                    <FilterOutlined /> Filter
                                </button>
                            )}
                        </FilterButtonModal>
                    </div>

                </div>

                <div className="products-list">

                    <div className="products-card-wrapper">
                        {fetching ?
                            productData.map(p =>
                                <Item
                                    key={p._id}
                                    id={p._id}
                                    name={p.title}
                                    description={p.description}
                                    price={p.price}
                                    date={p.date}
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
            </div>
        </>
    )
}

export default Products