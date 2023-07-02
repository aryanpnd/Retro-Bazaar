import React from "react";
import Navbar from "../Navbar";
import Card from "../../components/wishlist/Card";
import "../../css/wishlist.css";
import {
  DownOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

export default function Wishlist() {
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
        <div className="wishlist-cards-container">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
