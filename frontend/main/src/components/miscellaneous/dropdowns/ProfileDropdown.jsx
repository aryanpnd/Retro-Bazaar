import React, { useEffect, useState } from "react";
import "./ProfileDropdown.css";
import { UserOutlined, LogoutOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiURL } from "../../../App";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { productsContext } from "../../../contexts/productsContext";
import { toast } from "react-toastify";

export default function ProfileDropdown({ children, position }) {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(productsContext);
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownMenuStyle = {};

  if (position === "bottom") {
    dropdownMenuStyle.top = "100%";
  } else {
    dropdownMenuStyle.bottom = "100%";
  }

  const signOut = () => {
    setLoading(true)
    axios
      .get(`${apiURL}/api/signOutUser`, { withCredentials: true })
      .then(() => {
        setIsAuth(false)
        setLoading(false)
        toast.success("Logout successfully", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        toast.error("Error occurred, Logout failed", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        console.log(error);
      });
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      className={`dropdown ${isOpen ? "open" : ""}`}
    >
      <div style={{ borderRadius: "25px" }} onClick={toggleDropdown}>
        {children}
      </div>
      <div style={dropdownMenuStyle} className="dropdown-menu">
        <button onClick={() => navigate("/myprofile")}>
          <span>
            {" "}
            <UserOutlined />{" "}
          </span>{" "}
          My profile
        </button>
        <button onClick={signOut}>
          {loading ?
              <LoadingOutlined />:
            <>
              <span>
                {" "}
                <LogoutOutlined />{" "}
              </span>
              Logout
            </>
          }
        </button>
      </div>
    </div>
  );
}
