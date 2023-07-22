import React, { useEffect, useState } from "react";
import "./userprofile.css";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiURL } from "../../App";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loader from "../../assets/lottie/cart-icon-loader.json";
import Card from "../miscellaneous/productCards/Card";

function UserProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [productData, setProductData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    photoURL: "",
    email: "N/A",
    name: "NA",
    phoneNo: "N/A",
  });
  const [name, setName] = useState(userInfo.name);

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
      setName(data.name);
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
      <div className="left">
        <div className="user-profile-card">
          <div className="profile-photo-container">
            <img
              src={
                userInfo.photoURL
                  ? userInfo.photoURL
                  : `https://ui-avatars.com/api/?name=${userInfo.name}&background=e91e63&color=fff&rounded=true`
              }
              alt="profile img"
            />
          </div>

          <div className="user-profile-details">
            Name:{" "}
            <span style={{ display: !editable ? "inline" : "none" }}>
              {userInfo.name}
            </span>
            <input
              autoFocus
              type="text"
              id="user-profile-page-user-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ display: editable ? "inline" : "none" }}
            />
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
            Phone number:{" "}
            <span>
              {userInfo.phoneNo ? userInfo.phoneNo % 10000000000 : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* products uploaded by user */}
      <div className="right">
        <div className="total-products">
          Total Products Posted: <span>10</span>
        </div>
        <div className="product-cards-wrapper">
          <Card
            id={1}
            thumbnail={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            title={"Product1"}
            description={"HGLASHF GLJA FLJH LDF F DFSFD"}
            price={100}
            category={"Electronics"}
            date={"12-10-2023"}
            location={"Outside LPU"}
            userImage={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            userName={"Sam"}
            wishlistArray={[]}
            setWishlistArray={() => {}}
            productsArray={[]}
            setProductsArray={() => {}}
          />
          <Card
            id={1}
            thumbnail={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            title={"Product1"}
            description={"HGLASHF GLJA FLJH LDF F DFSFD"}
            price={100}
            category={"Electronics"}
            date={"12-10-2023"}
            location={"Outside LPU"}
            userImage={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            userName={"Sam"}
            wishlistArray={[]}
            setWishlistArray={() => {}}
            productsArray={[]}
            setProductsArray={() => {}}
          />
          <Card
            id={1}
            thumbnail={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            title={"Product1"}
            description={"HGLASHF GLJA FLJH LDF F DFSFD"}
            price={100}
            category={"Electronics"}
            date={"12-10-2023"}
            location={"Outside LPU"}
            userImage={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            userName={"Sam"}
            wishlistArray={[]}
            setWishlistArray={() => {}}
            productsArray={[]}
            setProductsArray={() => {}}
          />
          <Card
            id={1}
            thumbnail={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            title={"Product1"}
            description={"HGLASHF GLJA FLJH LDF F DFSFD"}
            price={100}
            category={"Electronics"}
            date={"12-10-2023"}
            location={"Outside LPU"}
            userImage={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            userName={"Sam"}
            wishlistArray={[]}
            setWishlistArray={() => {}}
            productsArray={[]}
            setProductsArray={() => {}}
          />
          <Card
            id={1}
            thumbnail={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            title={"Product1"}
            description={"HGLASHF GLJA FLJH LDF F DFSFD"}
            price={100}
            category={"Electronics"}
            date={"12-10-2023"}
            location={"Outside LPU"}
            userImage={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            userName={"Sam"}
            wishlistArray={[]}
            setWishlistArray={() => {}}
            productsArray={[]}
            setProductsArray={() => {}}
          />
          <Card
            id={1}
            thumbnail={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            title={"Product1"}
            description={"HGLASHF GLJA FLJH LDF F DFSFD"}
            price={100}
            category={"Electronics"}
            date={"12-10-2023"}
            location={"Outside LPU"}
            userImage={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            userName={"Sam"}
            wishlistArray={[]}
            setWishlistArray={() => {}}
            productsArray={[]}
            setProductsArray={() => {}}
          />
          <Card
            id={1}
            thumbnail={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            title={"Product1"}
            description={"HGLASHF GLJA FLJH LDF F DFSFD"}
            price={100}
            category={"Electronics"}
            date={"12-10-2023"}
            location={"Outside LPU"}
            userImage={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            userName={"Sam"}
            wishlistArray={[]}
            setWishlistArray={() => {}}
            productsArray={[]}
            setProductsArray={() => {}}
          />
          <Card
            id={1}
            thumbnail={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            title={"Product1"}
            description={"HGLASHF GLJA FLJH LDF F DFSFD"}
            price={100}
            category={"Electronics"}
            date={"12-10-2023"}
            location={"Outside LPU"}
            userImage={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            userName={"Sam"}
            wishlistArray={[]}
            setWishlistArray={() => {}}
            productsArray={[]}
            setProductsArray={() => {}}
          />
          <Card
            id={1}
            thumbnail={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            title={"Product1"}
            description={"HGLASHF GLJA FLJH LDF F DFSFD"}
            price={100}
            category={"Electronics"}
            date={"12-10-2023"}
            location={"Outside LPU"}
            userImage={
              "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            }
            userName={"Sam"}
            wishlistArray={[]}
            setWishlistArray={() => {}}
            productsArray={[]}
            setProductsArray={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
