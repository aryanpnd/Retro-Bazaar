import React, { useEffect, useState } from "react";
import "./userprofile.css";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiURL } from "../../App";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loader from "../../assets/lottie/cart-icon-loader.json";

function UserProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState("false");
  const [productCount, setProductCount] = useState(0);
  const [productData, setProductData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: "N/A",
    name: "N/A",
    phone: "N/A",
  });

  useEffect(() => {
    setLoading(true);
    getUserDetails();
    getProductsByUser();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get(apiURL + "/api/getUserInfo", {
        withCredentials: true,
      });
      const data = res.data.data;
      setUserInfo(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getProductsByUser = async () => {
    try {
      const res = await axios.get(`${apiURL}/api/getUserProducts`, {
        withCredentials: true,
      });

      const products = res.data;
      setProductData(products);
      setProductCount(products.length);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const changeUserName = async () => {
    const name = document.getElementById(
      "user-profile-page-user-name"
    ).innerHTML;
    try {
      const res = await axios.put(
        `${apiURL}/api/changeUserName`,
        {
          name: name,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        window.location.reload();
      }
      console.log("res", res);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="lottie-loader-container">
      <div className="lottie-loader-inner-wrapper">
        <Lottie animationData={loader} loop={true} />
      </div>
    </div>
  ) : (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <div className="profile-photo-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile img"
          />
        </div>

        <div className="user-profile-details">
          Name:{" "}
          <span contenteditable={editable} id="user-profile-page-user-name">
            {userInfo.name}
          </span>
          <span className="user-profile-edit-btn">
            {editable === "true" ? (
              <UploadOutlined
                onClick={() => {
                  setEditable("false");
                  changeUserName();
                }}
              />
            ) : (
              <EditOutlined onClick={() => setEditable("true")} />
            )}
          </span>
        </div>
        <div className="user-profile-details">
          Email: <span>{userInfo.email}</span>
        </div>
        <div className="user-profile-details">
          Phone number: <span>{userInfo.phone ? userInfo.phone : "N/A"}</span>
        </div>
      </div>

      {/* products uploaded by user */}
      <div className="user-profile-product-wrapper user-profile-card">
        <div className="user-profile-number-products ">
          Number of products uploaded: <span>{productCount}</span>
        </div>

        <div>
          {productData.map((p) => {
            return (
              <div
                className="link-to-self-product"
                onClick={() => {
                  navigate("/viewproduct/" + p._id);
                }}
              >
                Product: {p._id}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
