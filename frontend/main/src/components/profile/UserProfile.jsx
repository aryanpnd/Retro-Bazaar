import React, { useState } from "react";
import "./userprofile.css";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";

function UserProfile() {
  const [name, setName] = useState();
  const [editable, setEditable] = useState("false");

  const changeUserName = async () => {
    setName(document.getElementById("user-profile-page-user-name").innerHTML);
  };

  return (
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
            Shashwat Singh
          </span>
          <span className="user-profile-edit-btn">
            {editable === "true" ? (
              <UploadOutlined
                onClick={(e) => {
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
          Email: <span>vnsshashwat@gmail.com</span>
        </div>
        <div className="user-profile-details">
          Phone number: <span>9140062947</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
