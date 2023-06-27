import React, { useState } from 'react'
import "../../css/Products.css"
import data from '../../assets/data/FakeData.json'
import Item from './Item'

function Products() {

    const [productData, setProductData] = useState(data.products)

    return (
        <>
            <div className="products-container">
                <div className="products-list">
                    <div className="products-categories">
                        <div className="slider-container">
                            <div className="slider">
                                <button>All</button>
                                <button>Mobile</button>
                                <button>Laptops</button>
                                <button>Clothes</button>
                                <button>Books</button>
                                <button>Study</button>
                                <button>Cosmetics</button>
                            </div>
                        </div>
                    </div>
                    <div className="products-card-wrapper">
                        {
                            productData.map(p => <>
                                <Item
                                    key={p.id}
                                    id={p.id}
                                    // name={p.name}
                                    name={p.title}
                                    description={p.description}
                                    price={p.price}
                                    // date={p.date}
                                    // image={p.image}
                                    image={p.thumbnail}
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