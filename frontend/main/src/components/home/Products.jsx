import React, { useContext, useEffect, useState } from "react";
import "./styles/Products.css";
import Item from "../miscellaneous/productCards/Item";
import axios from "axios";
import { apiURL } from "../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "./categories";
import { DeleteFilled, FilterOutlined } from "@ant-design/icons";
import ProductsCardSkeleton from "../miscellaneous/productsCardSkeleton/productsCardSkeleton";
import FilterButtonModal from "../miscellaneous/modal/filterButtonModal";
import { productsContext } from "../../contexts/productsContext";

function Products() {
  const { productData, setProductData } = useContext(productsContext);

  const [modal, setModal] = useState(false);
  const [wishlistData, setWishlistData] = useState();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiURL}/api/products`, { withCredentials: true })
      .then((data) => {
        setProductData(data.data);
      });

    axios
      .get(`${apiURL}/api/getWishlist`, { withCredentials: true })
      .then((data) => {
        setWishlistData(data.data.products);
        setFetching(true);
      });
  }, []);

  const sendToast = (name, type) => {
    type
      ? toast.success(`${name}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      : toast.error(`${name}`, {
          icon: <DeleteFilled style={{ color: "#c91d23" }} />,
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
  };

  return (
    <>
      <div className="products-container">
        <div className="product-list-head">
          <Categories setFetching={setFetching} />

          <div className="filter-container">
            <button className="filter-button" onClick={() => setModal(!modal)}>
              <FilterOutlined /> Filter
            </button>
            <FilterButtonModal
              setProductData={setProductData}
              modal={modal}
              setModal={setModal}
            />
          </div>
        </div>

        <div className="products-list">
          <div className="products-card-wrapper">
            {fetching ? (
              productData.map((p) => (
                <Item
                  key={p._id}
                  id={p._id}
                  name={p.title}
                  description={p.description}
                  price={p.price}
                  date={p.date}
                  location={p.location}
                  image={p.thumbnail}
                  category={p.category}
                  userImage={p.postedBy.photoURL}
                  userName={p.postedBy.name}
                  wishlistData={wishlistData}
                  sendToast={sendToast}
                  productId={p._id}
                />
              ))
            ) : (
              <ProductsCardSkeleton count={9} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
