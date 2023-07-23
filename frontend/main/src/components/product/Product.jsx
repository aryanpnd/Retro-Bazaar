import React, { useEffect, useState } from "react";
import "./product.css";
import {
  LeftCircleOutlined,
  LoginOutlined,
  MailOutlined,
  PhoneFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import MyCarousel from "./Carousel";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../App";
import Lottie from "lottie-react";
import loader from "../../assets/lottie/cart-icon-loader.json";
import { toast } from "react-toastify";
import LoginModal from "../miscellaneous/loginModal/LoginModal";

function Product() {
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendToast = (name) => {
    try {
      toast.success(`${name}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch { }
  };

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
        console.log("pic:", data);
      } else {
        toast.error(`No data found for this product`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      {loading ? (
        <div className="lottie-loader-container">
          <div className="lottie-loader-inner-wrapper">
            <Lottie animationData={loader} loop={true} />
          </div>
        </div>
      ) : (
        <div className="prodct-wrapper">
          <div className="product-images">
            <MyCarousel imageArray={data.images} />
          </div>
          <div className="product-details">
            {/* <div
              className="product-back-btn"
              onClick={() => {
                navigate("/");
              }}
            >
              <LeftCircleOutlined />
              <span>Back to product list</span>
            </div> */}
            <div className="product-category-path">
              Category {">"} {data.category}
            </div>
            <div className="product-info-card">
              <div className="product-title">{data.title}</div>
              <div className="product-description">{data.description}</div>
            </div>
            <div className="product-info-card" style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="product-title"><span style={{ fontWeight: "100" }}>Quantity</span> {data.quantity}</div>
              <div className="product-title">₹{data.price}</div>
            </div>
            <div className="product-info-card" style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="product-upload-date">
                On sale from: <div>{data.date.split("T")[0]}</div>
              </div>
              <div className="product-upload-date">
                Brand: <div>{data.brand}</div>
              </div>
            </div>

            <div className="product-info-card">
              <div className="product-seller-heading">Contact Seller</div>
              <div className="product-seller-page-outer-wrapper">
                <div className="product-seller-details-warapper-left">
                  <div className="product-title">
                    Posted By:{" "}
                    <span className="product-owner">{data.postedBy.name}</span>
                  </div>
                  <div className="product-owner-contact-wrapper">
                    {data.postedBy.phoneNo ?
                      <>
                        <a
                          onClick={() => {
                            navigator.clipboard.writeText(data.postedBy.email);
                            sendToast("Email Id copied to clipboard!");
                          }}
                          href={`mailto:${data.postedBy.email}`}
                        >
                          <MailOutlined />
                        </a>
                        <a
                          onClick={() => {
                            navigator.clipboard.writeText(
                              data.postedBy.phoneNo % 10000000000
                            );
                            sendToast("Phone number copied to clipboard!");
                          }}
                          href={`tel:+${data.postedBy.phoneNo}`}
                        >
                          <PhoneFilled />
                        </a>
                        <a
                          onClick={() => {
                            navigator.clipboard.writeText(
                              data.postedBy.phoneNo % 10000000000
                            );
                            sendToast("Whatsapp number copied to clipboard!");
                          }}
                          href={`https://wa.me/+${data.postedBy.phoneNo}`}
                          target="blank"
                        >
                          <WhatsAppOutlined />
                        </a>
                      </>
                      : 
                      <>Login to see the details
                        <button className="pc-center-navbar-element-selected" style={{border:'none',fontWeight:'100'}} onClick={()=>setModal(true)}><LoginOutlined style={{marginLeft:'5px'}}/> </button>
                      </>
                    }
                  </div>
                </div>

                <div className="product-seller-details-warapper-right">
                  <div className="product-page-profile-img-container">
                    <img
                      src={
                        data.postedBy.photoURL
                          ? data.postedBy.photoURL
                          : `https://ui-avatars.com/api/?name=${data.postedBy.name}&background=e91e63&color=fff&rounded=true`
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <LoginModal modal={modal} setModal={setModal}/>
    </>
  );
}

export default Product;
