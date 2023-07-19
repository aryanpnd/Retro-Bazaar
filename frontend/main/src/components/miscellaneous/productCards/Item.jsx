import React, { useContext, useEffect, useState } from "react";
// import { Heart, HeartOutline } from 'react-ionicons'
import "./Item.css";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiURL } from "../../../App";
import { ClipLoader, ClockLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../../../contexts/productsContext";

function Item({
  id,
  name,
  description,
  price,
  category,
  date, location,
  image,
  userImage,
  userName,
  wishlistData,
  sendToast,
  productId,
  show
}) {
  const { isAuth, setLModal } = useContext(productsContext);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [dateAgo, setDateAgo] = useState(0);

  useEffect(() => {
    if (show) return // for the preview in sell product section

    const isExists = wishlistData?.find((item) => item._id === id);
    if (isExists) {
      setWishlist(true);
    } else {
      setWishlist(false);
    }
    const nowDate = new Date();
    const nowDateis = new Date(nowDate.toISOString().split("T")[0]);
    const thenDate = new Date(date.split("T")[0]);
    setDateAgo((nowDateis - thenDate) / (1000 * 60 * 60 * 24));
  }, []);

  async function toggleWishlist() {
    if (show) return
    setSpinnerLoading(true);

    if (!wishlist) {
      await axios
        .post(
          `${apiURL}/api/addToWishlist`,
          { productId: id },
          { withCredentials: true }
        )
        .then((res) => {
          setWishlist(true);
          sendToast(`${name} ${res.data}`, true);
          setSpinnerLoading(false);
        });
    } else {
      await axios
        .delete(`${apiURL}/api/deleteOneFromWishlist?productId=${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setWishlist(false);
          sendToast(`${name} ${res.data}`, false);
        });
      setSpinnerLoading(false);
    }
  }

  return (
    <>
      <div className="item-container">
        <div className="item-img-wrapper">
          <img className="item-img" src={image} alt="" />
          <div className="item-img-wishlist" onClick={() => isAuth ? toggleWishlist() : setLModal(true)}>
            {wishlist ? (
              spinnerLoading ? (
                <ClockLoader
                  color={"grey"}
                  loading={true}
                  size={20}
                  speedMultiplier={5}
                />
              ) : (
                <HeartFilled style={{ color: "#bf0b0b", fontSize: "1.8rem" }} />
              )
            ) : spinnerLoading ? (
              <ClockLoader
                color={"#21b94f"}
                loading={true}
                size={20}
                speedMultiplier={5}
              />
            ) : (
              <HeartFilled style={{ color: "grey", fontSize: "1.8rem" }} />
            )}
          </div>

          <div className="item-img-product-info">
            <div style={{ background: location === 'Inside LPU' ? '#ef7f1a' : '#ef2a1a' }} className="postedDate">{location}</div>
            <div className="postedDate">{dateAgo} Days ago</div>
          </div>
        </div>
        <div className="item-title-header-container">
          <div className="item-title">{name}</div>
          <div className="item-price">₹{price}</div>
        </div>
        <div className="item-description-container">
          <div className="item-description">{description}</div>
        </div>
        <div className="item-date-and-category-container">
          <div className="item-category">{category}</div>
          <div className="item-postedby">Posted by</div>
        </div>
        <div className="item-Bottom-container">
          <button
            className="item-view-now-btn"
            onClick={() => {
              if (show) return
              navigate("/viewproduct/" + productId);
            }}
          >
            View details
          </button>
          <img
            className="item-user-profile"
            style={{
              height: "2.2rem",
              width: "2.2rem",
              borderRadius: "100%",
              border: "1px solid",
            }}
            src={`${userImage
              ? userImage
              : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`
              }`}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Item;
