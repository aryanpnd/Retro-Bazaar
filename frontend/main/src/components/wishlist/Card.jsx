import React from "react";
import "../../css/card.css";

export default function Card() {
  return (
    <>
      <div className="wishlist-card-content-container">
        <div className="wishlist-card-image-container">
          <img
            src="https://img.etimg.com/photo/msid-93619818,imgsize-70268/AppleLaptops.jpg"
            alt="productimage"
          />
        </div>
        <div className="wishlist-card-footer">
          <div className="wishlist-card-item-name">Laptop</div>
          <div className="wishlist-card-item-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            perspiciatis commodi ab?
          </div>
          <div className="wishlist-card-price">Rs. 120</div>
          <div className="wishlist-add-to-cart-btn-container">
            <span className="wishlist-add-to-cart-footer">Add to cart</span>
          </div>
        </div>
      </div>
    </>
  );
}
