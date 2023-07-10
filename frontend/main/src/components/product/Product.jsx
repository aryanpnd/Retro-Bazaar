import React from "react";
import "./product.css";
import { LeftCircleOutlined } from "@ant-design/icons";
import MyCarousel from "./Carousel";

function Product() {
  return (
    <>
      <div className="prodct-wrapper">
        <div className="product-images">
          <MyCarousel />
        </div>
        <div className="product-details">
          <div className="product-back-btn">
            <LeftCircleOutlined />
            <span>Back to product list</span>
          </div>
          <div className="product-category-path">
            category {">"} sub-category{" "}
          </div>
          <div className="product-info-card">
            <div className="product-title">Product 8 Mr Cat</div>
            <div className="product-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatum, corrupti! Voluptatum soluta, molestias ea laborum
              quibusdam illo nostrum! Cumque, provident. Lorem, ipsum dolor sit
              amet consectetur adipisicing elit. Minus odit eveniet ratione?
            </div>
          </div>
          <div className="product-info-card">
            <div className="product-upload-date">
              On sale from: <span>2023-12-08</span>
            </div>
          </div>

          <div className="product-extra-card-container">
            <div className="product-price product-small-card">
              <div className="product-small-card-title"> Price</div>
              <div className="product-small-card-text product-circle-bg-big">
                120 INR
              </div>
            </div>
            <div className="product-quantity product-small-card">
              <div className="product-small-card-title"> Quantity</div>
              <div className="product-small-card-text product-circle-bg-big">
                6
              </div>
            </div>
            <div className="product-quantity product-small-card">
              <div className="product-small-card-title">Brand</div>
              <div
                style={{ marginTop: "2rem" }}
                className="product-small-card-text"
              >
                Bulberry product
              </div>
            </div>
          </div>

          <div className="product-info-card">
            <div className="product-title">
              Posted By: <span className="product-owner">Shashwat Singh</span>
            </div>
            <div className="product-owner-details">
              Email: <span>vnsshashwat@gmail.com</span>
            </div>
            <div className="product-owner-details">
              Phone number: <span>9140062947</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
