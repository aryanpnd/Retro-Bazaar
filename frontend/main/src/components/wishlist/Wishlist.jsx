import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Card from "./Card";
import "../../css/wishlist.css";
import { apiURL } from "../../App";
import {
  DownOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import axios from "axios";

// mraligator@aligator.com
// XTjB7vu@MPfZM

export default function Wishlist() {
  const [wishlistDataFetched, setWishlistDataFetched] = useState(false);
  const [wishlistArray, setWishlistArray] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const res = await axios.get(`${apiURL}/api/getWishlist`, {
      withCredentials: true,
    });
    setWishlistArray(res.data.products);
    setWishlistDataFetched(true);
  };

  const makeCards = () => {
    if (wishlistDataFetched) {
      return wishlistArray.map((item) => {
        return (
          <Card
            key={item._id}
            thumbnail={item.thumbnail}
            title={item.title}
            description={item.description}
            price={item.price}
            category={item.category}
            date={item.date.split("T")[0]}
          />
        );
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="wishlist-header-container">
        <div className="wishlist-heading-container">
          <span className="wishlist-heading">Wishlist </span>
          <span className="wishlist-count-span"> (8)</span>
        </div>
        <div className="wishlist-header-side-bar">
          <span className="wishlist-filter-span wishlist-heading-span-btn">
            <FilterOutlined style={{ marginRight: "6px" }} />
            <DownOutlined />
          </span>
          <span className="wishlist-move-all-to-cart-span wishlist-heading-span-btn">
            <ShoppingCartOutlined /> Move all to cart
          </span>
        </div>
      </div>
      <div className="wishlist-cards-wrapper">
        <div className="wishlist-cards-container">{makeCards()}</div>
      </div>
    </>
  );
}
