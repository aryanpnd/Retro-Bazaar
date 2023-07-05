import React, { useEffect, useState } from "react";
// import { Heart, HeartOutline } from 'react-ionicons'
import "../../css/card.css";
import axios from "axios";
import { apiURL } from "../../App";

export default function Card({
  thumbnail,
  title,
  description,
  price,
  category,
  date,
}) {
  return (
    <>
      <div className="wishlist-card-item-container">
        <div className="wishlist-card-item-img-wrapper">
          <img
            className="wishlist-card-item-img"
            src={thumbnail}
            alt="productImage"
          />
        </div>
        <div className="wishlist-card-item-title-header-container">
          <div className="wishlist-card-item-title">{title}</div>
          <div className="wishlist-card-item-price">Rs. {price}</div>
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
          <img
            className="wishlist-card-item-user-profile"
            style={{
              height: "2.2rem",
              width: "2.2rem",
              borderRadius: "100%",
              border: "1px solid",
            }}
            // src={`${
            //   userImage
            //     ? userImage
            //     : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`
            // }`}

            src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
