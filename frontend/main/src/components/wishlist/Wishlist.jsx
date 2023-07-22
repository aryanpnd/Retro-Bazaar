import React, { useEffect, useState } from "react";
import Card from "../miscellaneous/productCards/Card";
import "./wishlist.css";
import { apiURL } from "../../App";
import {
  DeleteOutlined,
  DownOutlined,
  FilterOutlined,
  LoadingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import ProductsCardSkeleton from "../miscellaneous/productsCardSkeleton/productsCardSkeleton";
import { useNavigate } from "react-router-dom";
import Modal from "../miscellaneous/modal/Modal";
import { toast } from "react-toastify";

export default function Wishlist() {
  const navigate = useNavigate();

  const [loading, setloading] = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  const [wishlistArray, setWishlistArray] = useState([]);
  const [modal, setModal] = useState(false);

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

  const handleDeleteWishlist = async () => {
    setDelLoading(true);
    await axios
      .delete(`${apiURL}/api/deleteAllFromWishlist`, {
        withCredentials: true,
      })
      .then((res) => {
        setloading(false);
        setWishlistArray([]);
        toast.success(`Wishlist has been deleted successfully`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setModal(false);
      })
      .catch((err) => {
        setDelLoading(false);
        console.log(err);
        setModal(false);
        toast.error(`Some error occurred while deleting Wishlist`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <>
      <Modal
        setModal={setModal}
        modal={modal}
        noCloseBtn={true}
        height={"20%"}
        width={"50%"}
        borderR={"8px"}
        noHead={true}
      >
        <div>Are you sure ?</div>
        <div className="modal-delete-btn-box">
          <button onClick={() => setModal(false)}>cancel</button>
          <button
            style={{ background: "#c90000", color: "white" }}
            onClick={handleDeleteWishlist}
          >
            <DeleteOutlined />
            {delLoading ? <LoadingOutlined /> : "Delete"}
          </button>
        </div>
      </Modal>

      <div className="wishlist-header-container">
        <div className="wishlist-heading-container">
          <span className="wishlist-heading">Wishlist </span>
          <span className="wishlist-count-span"> ({wishlistArray.length})</span>
        </div>
        <div className="wishlist-header-side-bar">
          <span
            className="wishlist-move-all-to-cart-span wishlist-heading-span-btn"
            onClick={() => setModal(true)}
          >
            <DeleteOutlined /> Delete all
          </span>
        </div>
      </div>
      <div className="wishlist-cards-wrapper">
        <div className="wishlist-cards-container">
          {loading ? (
            <ProductsCardSkeleton count={9} />
          ) : wishlistArray.length === 0 ? (
            <div className="emptyWishlist">
              <h2>Your wish list is empty</h2>
              <button className="addProductBtn" onClick={() => navigate("/")}>
                Add products
              </button>
            </div>
          ) : (
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
                location={item.location}
                userImage={item.postedBy.photoURL}
                userName={item.postedBy.name}
                productsArray={wishlistArray}
                setProductsArray={setWishlistArray}
                isWishlist={true}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
