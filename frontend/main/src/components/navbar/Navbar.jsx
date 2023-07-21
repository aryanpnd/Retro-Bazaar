import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import "./sellButton.css";
import "./loginBtn.css";
import {
  FilterOutlined,
  HeartFilled,
  HeartOutlined,
  HomeFilled,
  HomeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { apiURL } from "../../App";
import axios from "axios";
import ProfileDropdown from "../miscellaneous/dropdowns/ProfileDropdown";
import { useMatch, useNavigate } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import FilterButtonModal from "../miscellaneous/modal/filterButtonModal";
import Searchbar from "../miscellaneous/searchbar/Searchbar";
import { Slide, toast } from "react-toastify";
import logo from "../../assets/img/logo.png";

function Navbar() {
  const { setProductData, isAuth, setLModal } = useContext(productsContext);
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState(false);
  const [userData, setUserData] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  const home = useMatch("/");
  const wishlist = useMatch("/wishlist");

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const appLoads = () => {
    try {
      axios
        .get(`${apiURL}/api/getUserInfo`, { withCredentials: true })
        .then((response) => {
          setUserData(response.data.data.photoURL);
          setUserName(response.data.data.name);
        })
        .catch((error) => {
          console.log(error);
          return
        });
    } catch (err) {
      return
    }
  };
  useEffect(() => {
    appLoads();
  }, []);

  const handleUnderDev = () => {
    toast("🛠️ This feature is still under developent 🛠️", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Slide,
      theme: "light",
    });
  };

  return (
    <>
      {/* mobile navbar */}
      <div className="top-nav-container-mob">
        <FilterButtonModal
          setProductData={setProductData}
          modal={modal}
          setModal={setModal}
        />
        <div
          className="top-nav-title"
          style={{ display: search ? "none" : "" }}
        >
          <img src={logo} alt="" style={{ width: "100%", height: "100%" }} />
        </div>

        <Searchbar search={search} setSearch={setSearch} />

        <span
          style={{
            display: home ? (search ? "none" : "") : "none",
            background: "white",
            color: "black",
            padding: "0.4rem",
            borderRadius: "8px",
            fontSize: "0.8rem",
          }}
          onClick={() => setModal(!modal)}
        >
          <FilterOutlined style={{ fontSize: "1rem" }} />
          Filter
        </span>
      </div>

      <div
        className={
          show
            ? "bottom-nav-container-mob slideBottom"
            : "bottom-nav-container-mob-none"
        }
      >
        <button
          style={{
            background: home ? "#8b2be2" : "transparent",
            color: "#ffffff",
            fontSize: "1.5rem",
          }}
          className={`bottom-nav-container-mob-button`}
          onClick={() => navigate("/")}
        >
          {home ? <HomeFilled /> : <HomeOutlined />}
        </button>

        <button
          className={`bottom-nav-container-mob-button`}
          onClick={handleUnderDev}
        >
          <MessageOutlined style={{ color: "#ffffff", fontSize: "1.5rem" }} />
        </button>

        <span style={{ height: "80%", width: "25%" }}>
          <button
            className="sellBtn"
            onClick={() => { isAuth ? navigate("/sell") : setLModal(true) }}
          >
            Sell
          </button>
        </span>

        <button
          style={{
            background: wishlist ? "#8b2be2" : "transparent",
            color: "#ffffff",
            fontSize: "1.5rem",
          }}
          className={`bottom-nav-container-mob-button`}
          onClick={() => isAuth ?  navigate("/wishlist"):setLModal(true)}
        >
          {wishlist ? <HeartFilled /> : <HeartOutlined />}
        </button>

        {
          isAuth ?
            <span className="bottom-nav-container-mob-button">
              <ProfileDropdown position={"top"}>
                <img
                  style={{ width: "2.2rem", borderRadius: "100%" }}
                  src={`${userData
                    ? userData
                    : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`
                    }`}
                  alt=""
                />
              </ProfileDropdown>
            </span>
            :
            <button className="loginBtn" onClick={() => window.location.href = '/auth'}>Login</button>
        }
      </div>

      {/* pc navbar */}

      <div div className="navbar-container-pc">
        <div className="navbar-container-pc-left">
          <div
            className="top-nav-title"
            style={{ display: search ? "none" : "" }}
          >
            <img src={logo} alt="" style={{ width: "100%", height: "100%" }} />
          </div>
          <Searchbar />
        </div>

        <div className="navbar-container-pc-center">
          <div
            className={`pc-center-navbar-element${home ? "-selected" : ""}`}
            onClick={() => navigate("/")}
          >
            {home ? <HomeFilled style={{ color: "white", fontSize: "1.4rem" }} /> : <HomeOutlined style={{ color: "white", fontSize: "1.4rem" }} />}
            <div className="pc-navbar-icon-text">home</div>
          </div>

          <div
            className={`pc-center-navbar-element${wishlist ? "-selected" : ""}`}
            onClick={() => isAuth ? navigate("/wishlist"):setLModal(true) }
          >
            {wishlist ? <HeartFilled style={{ color: "#ffffff", fontSize: "1.4rem" }} /> : <HeartOutlined style={{ color: "#ffffff", fontSize: "1.4rem" }} />}
            <div className="pc-navbar-icon-text">wishlist</div>
          </div>

          <div className="pc-center-navbar-element" onClick={handleUnderDev}>
            {
              <MessageOutlined
                style={{ color: "#ffffff", fontSize: "1.4rem" }}
              />
            }
            <div className="pc-navbar-icon-text">chat</div>
          </div>
        </div>
        <div className="navbar-container-pc-right">
          <button
            className="sellBtn"
            onClick={() => { isAuth ? navigate("/sell") : setLModal(true) }}
          >
            Sell Now
          </button>
          {
            isAuth ?
              <ProfileDropdown position={"bottom"}>
                <img
                  style={{
                    height: "3rem",
                    width: "3rem",
                    borderRadius: "25px",
                    border: "2px solid",
                    transform: "scale(0.9)",
                  }}
                  src={`${userData
                    ? userData
                    : `https://ui-avatars.com/api/?name=${userName}&background=e91e63&color=fff&rounded=true`
                    }`}
                  alt=""
                />
              </ProfileDropdown>
              :
              <button className="loginBtn" onClick={() => window.location.href = '/auth'}>Login</button>
          }
        </div>
      </div>
    </>
  );
}

export default Navbar;
