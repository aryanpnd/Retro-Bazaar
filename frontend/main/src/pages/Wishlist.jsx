import React, { useEffect, useState } from "react";
import Card from "../components/miscellaneous/productCards/Card";
import "../css/wishlist.css";
import { apiURL } from "../App";
import {
  DeleteOutlined,
  DownOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import ProductsCardSkeleton from "../components/miscellaneous/productsCardSkeleton/productsCardSkeleton";
import { useNavigate } from "react-router-dom";


export default function Wishlist() {

  const navigate = useNavigate()

  const [loading, setloading] = useState(true);
  const [wishlistArray, setWishlistArray] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const res = await axios.get(`${apiURL}/api/getWishlist`, {
      withCredentials: true,
    });
    setWishlistArray(res.data.products);
    setloading(false);
  };


  return (
    <>
      <div className="wishlist-header-container">
        <div className="wishlist-heading-container">
          <span className="wishlist-heading">Wishlist </span>
          <span className="wishlist-count-span"> ({wishlistArray.length})</span>
        </div>
        <div className="wishlist-header-side-bar">
          <span className="wishlist-move-all-to-cart-span wishlist-heading-span-btn">
            <DeleteOutlined /> Delete all
          </span>
        </div>
      </div>
      <div className="wishlist-cards-wrapper">
        <div className="wishlist-cards-container">
          {
            loading ? <ProductsCardSkeleton count={9} /> :
              wishlistArray.length === 0 ?
              <div className="emptyWishlist">
                <h2>
                  Your wish list is empty
                </h2>
                <button className="addProductBtn" onClick={()=>navigate('/')}>
                  Add products
                </button>
              </div>
                :
                wishlistArray.map((item) => (
                  <Card
                    key={item._id}
                    id={item._id}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    category={item.category}
                    date={item.date.split("T")[0]}
                    userImage={item.postedBy.photoURL}
                    userName={item.postedBy.name}
                    wishlistArray={wishlistArray}
                    setWishlistArray={setWishlistArray}
                  />
                ))
          }
        </div>
      </div>
    </>
  );
}
