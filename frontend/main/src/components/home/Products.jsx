import React, { useEffect, useState } from 'react'
import "../../css/Products.css"
import data from '../../assets/data/FakeData.json'
import Item from './Item'
import axios from 'axios'
import { apiURL } from '../../App'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Categories from './categories'

function Products() {

    const [productData, setProductData] = useState([])
    const [availableCategories, setavailableCategories] = useState([])
    const [totalProducts, settotalProducts] = useState(0)
    const [wishlistData, setWishlistData] = useState()
    const [fetching, setFetching] = useState(false)

    const fetchData = async () => {
        axios.get(`${apiURL}/api/totalproducts`, { withCredentials: true }).then((data) => {
            settotalProducts(data.data)
        })
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

    const sendToast = (name,thumbnail)=>{
        toast.success( `${name} added to wishlist`, {
            icon: <img style={{width:'2.2rem',height:'2.2rem',borderRadius:"5px",position:'absolute',left:'-0.6rem',bottom:'-1rem'}} src={thumbnail} alt="" />,
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:"dark",
            });
    }

    return (
        <>
        <ToastContainer />
            <div className="products-container">
                <div className="products-list">

                    <Categories setProductData={setProductData} availableCategories={availableCategories} />

                    <div className="products-card-wrapper">
                        {fetching &&
                            productData.map(p => <>
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
                            </>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products