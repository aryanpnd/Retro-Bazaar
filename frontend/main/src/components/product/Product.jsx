import React, { useEffect, useState } from "react";
import "./product.css";
import { LeftCircleOutlined } from "@ant-design/icons";
import MyCarousel from "./Carousel";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../App";

function Product() {
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const productId = params.query;
    setLoading(true);
    try {
      const res = await axios.get(
        apiURL + "/api/productdetails?pid=" + productId,
        { withCredentials: true }
      );
      if (res.data.success) {
        setData(res.data.data);
        setLoading(false);
      } else {
        alert("No data Found");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      {!loading && (
        <div className="prodct-wrapper">
          <div className="product-images">
            <MyCarousel imageArray={data.images} />
          </div>
          <div className="product-details">
            <div className="product-back-btn">
              <LeftCircleOutlined />
              <span>Back to product list</span>
            </div>
            <div className="product-category-path">
              Category {">"} {data.category}
            </div>
            <div className="product-info-card">
              <div className="product-title">{data.title}</div>
              <div className="product-description">{data.description}</div>
            </div>
            <div className="product-info-card">
              <div className="product-upload-date">
                On sale from: <span>{data.date.split("T")[0]}</span>
              </div>
            </div>

            <div className="product-extra-card-container">
              <div className="product-price product-small-card">
                <div className="product-small-card-title"> Price</div>
                <div className="product-small-card-text product-circle-bg-big">
                  {data.price} INR
                </div>
              </div>
              <div className="product-quantity product-small-card">
                <div className="product-small-card-title"> Quantity</div>
                <div className="product-small-card-text product-circle-bg-big">
                  {data.quantity}
                </div>
              </div>
              <div className="product-quantity product-small-card">
                <div className="product-small-card-title">Brand</div>
                <div
                  style={{ marginTop: "2rem" }}
                  className="product-small-card-text"
                >
                  {data.brand}
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
      )}
    </>
  );
}

export default Product;