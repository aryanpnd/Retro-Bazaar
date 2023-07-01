import React, { useEffect, useState } from 'react'
import "../../css/Products.css"
import data from '../../assets/data/FakeData.json'
import Item from './Item'
import axios from 'axios'
import { apiURL } from '../../App'

function Products() {

    const [productData, setProductData] = useState([])
    const [availableCategories, setavailableCategories] = useState([])
    const [totalProducts, settotalProducts] = useState(0)

    const fetchData = async ()=>{
        axios.get(`${apiURL}/api/totalproducts`,{withCredentials: true}).then((data)=>{
            settotalProducts(data.data)
            console.log(data.data)
        })
       await axios.get(`${apiURL}/api/products`,{withCredentials: true}).then((data)=>{
            setProductData(data.data)
            console.log(data.data)
        })
       await axios.get(`${apiURL}/api/getProductSpecificField?field=category&distinct=true`,{withCredentials: true}).then((data)=>{
        setavailableCategories(data.data)
        console.log(data.data)
        })
    }
    useEffect(() => {
      fetchData()
    }, [])
    

    return (
        <>
            <div className="products-container">
                <div className="products-list">
                    <div className="products-categories">
                        <div className="slider-container">
                            <div className="slider">
                                {
                                    availableCategories.map((data,index)=>(
                                        <button key={index}>{data}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="products-card-wrapper">
                        {
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