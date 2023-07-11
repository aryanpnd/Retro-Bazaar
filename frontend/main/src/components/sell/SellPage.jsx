import React, { useState } from "react";
import "./styles/style.css";
import ImageUpload from "./ImageUpload";
import axios from "axios";

export default function SellPage() {
  const [image, setImage] = useState([]);

  const upload = () => {
    if (image.length <= 1) {
      console.log("please upload atleast two images");
      return;
    }
    image?.map((image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "retroBazaarTest");
      formData.append("cloud_name", "dnoycwhjx");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/dnoycwhjx/image/upload/",
          formData,
          {
            onUploadProgress: (ProgressEvent) => {
              console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    });
  };

  return (
    <div className="sell-container">
      <div className="fake-container-sell"></div>
      <div className="sell-heading">Sell a product</div>

      <div className="sell-body">
        <div className="sell-image-container">
          <div className="sell-product-details-heading">Upload images</div>

          <div className="sell-images-box">
            <ImageUpload num={1} setImage={setImage} image={image} />
            <ImageUpload num={2} setImage={setImage} image={image} />
            <ImageUpload num={3} setImage={setImage} image={image} />
            <ImageUpload num={4} setImage={setImage} image={image} />
            <ImageUpload num={5} setImage={setImage} image={image} />
            <ImageUpload num={6} setImage={setImage} image={image} />
          </div>
        </div>
        <div className="sell-form-container">
          <div className="sell-product-details-heading">Product details</div>
          <form className="sell-inputs-container">
            <input type="text" placeholder="Product title" required />
            <br />
            <input type="text" placeholder="Product description" required />
            <br />
            <input
              type="text"
              placeholder="Product brand if any (leave empty if not)"
              required
            />
            <br />
            <input type="text" placeholder="category" required />
            <br />

            <input
              type="number"
              placeholder="Quantity"
              required
              min={0}
              onClick={(e) => {
                if (e.target.value > 5) e.target.value.slice(0, 5);
              }}
            />
            <br />
            <input
              type="number"
              placeholder="Price"
              required
              min={0}
              onClick={(e) => {
                if (e.target.value > 5) e.target.value.slice(0, 5);
              }}
            />
            <br />

            <div className="sell-location-btn">
              <input type="radio" id="insidelpu" name="location" />
              <label htmlFor="insidelpu">Inside LPU</label>
              <input type="radio" id="nearlpu" name="location" />
              <label htmlFor="nearlpu">Near the LPU</label>
            </div>
            <button className="sell-preview-btn">Preview</button>
          </form>
          {/* <button className='sell-preview-btn' onClick={upload}>Preview</button> */}
        </div>
      </div>
      <div className="fake-container-sell-2"></div>
    </div>
  );
}
