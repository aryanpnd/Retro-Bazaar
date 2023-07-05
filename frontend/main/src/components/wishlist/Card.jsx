import React from "react";
// import { Heart, HeartOutline } from 'react-ionicons'
import "../../css/card.css";
import { DeleteFilled } from "@ant-design/icons";
import { apiURL } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

export default function Card({
  id,
  thumbnail,
  title,
  description,
  price,
  category,
  date,
  userImage, userName, wishlistArray,setWishlistArray
}) {

  const deleteItem = async () => {
    await axios.delete(`${apiURL}/api/deleteOneFromWishlist?productId=${id}`, {
      withCredentials: true,
    }).then((res)=>{
      setWishlistArray(
      wishlistArray.filter(item => {
        return item._id !== id 
      }))
      toast.success(`${title} ${res.data}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
    })
  }

  return (
    <>
      <div className="wishlist-card-item-container">
        <div className="wishlist-card-item-img-wrapper">
          <div className='item-img-wishlist' >
            <DeleteFilled className="delete-icon" onClick={deleteItem} />
          </div>
          <img
            className="wishlist-card-item-img"
            src={thumbnail}
            alt="productImage"
          />
        </div>
        <div className="wishlist-card-item-title-header-container">
          <div className="wishlist-card-item-title">{title}</div>
          <div className="wishlist-card-item-price">{price}</div>
        </div>
        <div className="wishlist-card-item-description-container">
          <div className="wishlist-card-item-description">{description}</div>
        </div>
        <div className="wishlist-card-item-date-and-category-container">
          <div className="wishlist-card-item-category">{category}</div>
          <div className="wishlist-card-item-date">{date}</div>
        </div>
        <div className="wishlist-card-item-Bottom-container">
          <button className="wishlist-card-item-view-now-btn">Chat Now</button>
          <img className='item-user-profile' style={{ height: "2.2rem", width: "2.2rem", borderRadius: "100%", border: '1px solid' }} src={`${userImage ? userImage : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`}`} alt='' />
        </div>
      </div>
    </>
  );
}
