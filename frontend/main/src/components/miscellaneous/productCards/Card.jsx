import React, { useEffect, useState } from "react";
// import { Heart, HeartOutline } from 'react-ionicons'
import { DeleteFilled, LoadingOutlined } from "@ant-design/icons";
import { apiURL } from "../../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";

export default function Card({
  id,
  thumbnail,
  title,
  description,
  price,
  category,
  date,
  location,
  userImage,
  userName,
  setProductsArray,
  productsArray,
  isWishlist
}) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [dateAgo, setDateAgo] = useState(0);

  const deleteItem = async () => {
    if (isWishlist) {
      setLoading(true);
      await axios
        .delete(`${apiURL}/api/deleteOneFromWishlist?productId=${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setProductsArray(
            productsArray.filter((item) => {
              return item._id !== id;
            })
          );
          toast.success(`${title} ${res.data}`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setLoading(false);
        });
    }
    else {
      setDelLoading(true)
      await axios
        .put(
          `${apiURL}/api/archiveProduct`,
          {
            productid: id,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setProductsArray(
            productsArray.filter((item) => {
              return item._id !== id;
            })
          );
          toast.success(`${title} ${res.data}`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setModal(false)
          setDelLoading(false);
        })
        .catch(()=>{
          setDelLoading(false)
          setModal(false)
          toast.error(`Error occurred while deleting the product`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    }
  };


  useEffect(() => {
    const nowDate = new Date();
    const nowDateis = new Date(nowDate.toISOString().split("T")[0]);
    const thenDate = new Date(date.split("T")[0]);
    setDateAgo((nowDateis - thenDate) / (1000 * 60 * 60 * 24));
  }, []);

  return (
    <>
      <div className="item-container">
        <div className="item-img-wrapper">
          <img className="item-img" src={thumbnail} alt="" />

          <div className="item-img-wishlist" style={{ display: isWishlist ? '' : 'none' }}>
            {loading ? (
              <ClockLoader
                color={"grey"}
                loading={true}
                size={20}
                speedMultiplier={5}
              />
            ) : (
              <DeleteFilled
                className="delete-icon"
                onClick={deleteItem}
              />
            )}
          </div>

          <div className="item-img-product-info">
            <div
              style={{
                background: location === "Inside LPU" ? "#ef7f1a" : "#ef2a1a",
              }}
              className="postedDate"
            >
              {location}
            </div>
            <div className="postedDate">{dateAgo} Days ago</div>
          </div>
        </div>
        <div className="item-title-header-container">
          <div className="item-title">{title}</div>
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
            style={{background:isWishlist?'':'#ed2121'}}
            onClick={() => {
              isWishlist ?
                navigate("/viewproduct/" + id) : setModal(true)
            }}
          >
            {isWishlist ? 'View details' : 'Delete'}
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
      <Modal
        setModal={setModal}
        modal={modal}
        noCloseBtn={true}
        height={"20%"}
        width={"50%"}
        borderR={"8px"}
        noHead={true}
      >
        <div>Are you sure you want to delete it ?</div>
        <div className="modal-delete-btn-box">
          <button onClick={() => setModal(false)}>cancel</button>
          <button
            style={{ background: "#c90000", color: "white" }}
            onClick={deleteItem}
          >
            <DeleteFilled />
            {delLoading ? <LoadingOutlined /> : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
}
