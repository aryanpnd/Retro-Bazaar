import React from "react";
import { useState } from "react";
import "./styles/FormInputs.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

export default function FormInputs({
  handleModal,
  setFormData,
  previewLoading,
}) {
  // input field values
  const [titleInput, setTitleInput] = useState({
    val: "",
    error: { status: false, message: "" },
  });
  const [descriptionInput, setDescriptionInput] = useState({
    val: "",
    error: { status: false, message: "" },
  });
  const [quantityInput, setQuantityInput] = useState();
  const [priceInput, setPriceInput] = useState();
  const [categoryInput, setcategoryInput] = useState();
  const [brandInput, setbrandInput] = useState();
  const [locationInput, setlocationInput] = useState();

  const handleLimit = (e, limit, setlimit) => {
    setlimit(e.target.value);
    if (e.target.value > limit) setlimit(e.target.value.slice(0, limit));
  };

  const handleInput = (e, setVal, limit) => {
    if (e.target.value.length < limit) {
      setVal({
        val: e.target.value,
        error: { status: true, message: `Length must be greater ${limit}` },
      });
    } else {
      setVal({
        val: e.target.value,
        error: { status: false },
      });
    }
  };

  const handleLocationChange = (e) => {
    setlocationInput(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setcategoryInput(e.target.value);
  };

  const handleBrandChange = (e) => {
    setbrandInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !locationInput ||
      titleInput.val.length < 5 ||
      descriptionInput.val.length < 20
    ) {
      toast.warning(`Please fill the required fields as mentioned`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setFormData({
      title: titleInput.val,
      description: descriptionInput.val,
      category: categoryInput,
      price: priceInput,
      quantity: quantityInput,
      brand: brandInput,
      location: locationInput,
      thumbnail: [],
      images: [],
      imagesSecureUrl: [],
      imagesPublicId: [],
    });

    handleModal();
  };

  return (
    <>
      <form className="sell-inputs-container" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Product title (required)"
          id="p-title"
          value={titleInput.val}
          onChange={(e) => handleInput(e, setTitleInput, 5)}
          required
        />
        <label
          style={{ display: titleInput.error.status ? "" : "none" }}
          htmlFor="p-title"
        >
          {titleInput.error.message}
        </label>
        <br />

        <input
          name="description"
          type="text"
          placeholder="Product description (required)"
          id="p-description"
          value={descriptionInput.val}
          onChange={(e) => handleInput(e, setDescriptionInput, 20)}
          required
        />
        <label
          style={{ display: descriptionInput.error.status ? "" : "none" }}
          htmlFor="p-description"
        >
          {descriptionInput.error.message}
        </label>
        <br />

        <input
          name="brand"
          type="text"
          placeholder="Product brand if any (leave empty if not)"
          onChange={handleBrandChange}
        />
        <br />

        <select
          name="category"
          style={{ padding: "14px" }}
          className="options"
          id="categories-select"
          required
          onChange={handleCategoryChange}
        >
          <option value="" disabled selected>
            Categories (required)
          </option>
          <option value="Mobiles">Mobiles</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationaries">Stationaries</option>
          <option value="Others">Others</option>
        </select>
        <br />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity (required)"
          required
          value={quantityInput}
          onChange={(e) => handleLimit(e, 3, setQuantityInput)}
        />
        <br />
        <input
          name="price"
          type="number"
          placeholder="Price in ₹ rupees (required)"
          required
          value={priceInput}
          onChange={(e) => handleLimit(e, 6, setPriceInput)}
        />
        <br />

        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          Select Location (required)
        </div>
        <div className="sell-location-btn">
          <input
            type="radio"
            id="insidelpu"
            name="location"
            value="Inside LPU"
            // checked={locationInput === 'Inside LPU'}
            onChange={handleLocationChange}
          />
          <label htmlFor="insidelpu">Inside LPU</label>
          <input
            type="radio"
            id="nearlpu"
            name="location"
            value="Near LPU"
            // checked={locationInput === 'Near LPU'}
            onChange={handleLocationChange}
          />
          <label htmlFor="nearlpu">Near LPU</label>
        </div>

        <button className="sell-preview-btn" type="submit">
          {previewLoading ? (
            <BeatLoader color="white" size={10} />
          ) : (
            <>
              Preview <ArrowRightOutlined />
            </>
          )}
        </button>

        <div className="fake-form-div"></div>
      </form>
    </>
  );
}
