import React, { useEffect, useState } from "react";
import "./styles/style.css";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import FormInputs from "./FormInputs";
import Modal from "../miscellaneous/modal/Modal";
import Item from "../miscellaneous/productCards/Item";
import { toast } from "react-toastify";
import { apiURL } from "../../App";

export default function SellPage() {

  const [modal, setModal] = useState(false)
  const [user, setuser] = useState({ name: '', photoUrl: '' })
  const [previewSource, setPreviewSource] = useState(null);
  const [image, setImage] = useState([]);
  const [inputData, setinputData] = useState({})
  const [formData, setFormData] = useState({
    title: null,
    description: null,
    category: null,
    price: null,
    quantity: null,
    brand: null,
    location: null,
    thumbnail: null,
    images: [],
    imagesPublicId: []
  });
  let images = []
  let imagesPublicId = []


  // getting user data for preview card
  useEffect(() => {
    axios.get(`${apiURL}/api/getUserInfo`, { withCredentials: true }).then((res) => {
      setuser(res.data.data)
    })
  }, [])



  // handling modal and error toasts
  const handleModal = () => {
    if (image.length <= 1) {
      toast.warning(`Please upload atleast two images`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return;
    }
    console.log(formData);
    setModal(!modal)
    previewFile(image[0])
  }


  // preview image in modal
  const previewFile = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewSource('');
    }
  };



  // handling image upload 
  const handleImageUpload = async () => {
    for (const img of image) {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "retroBazaarTest");
      formData.append("cloud_name", "dnoycwhjx");

      try {
        await axios.post(
          "https://api.cloudinary.com/v1_1/dnoycwhjx/image/upload/",
          formData,
          {
            onUploadProgress: (ProgressEvent) => {
              console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
            },
          }
        ).then((res) => {
          images = [...images, res.data.secure_url]
          imagesPublicId = [...imagesPublicId, res.data.public_id]
        })
      } catch (error) {
        console.error(error);
      }
    }

  };

  // submitting data to server
  const handleSubmitData = async () => {
    await axios
      .post(`${apiURL}/api/addproduct`, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        quantity: formData.quantity,
        brand: formData.brand,
        location: formData.location,
        thumbnail:images[0],
        images: images,
        imagesPublicId: imagesPublicId
      }, { withCredentials: true })
      .then((res) => console.log(res));
  }


  // doing this separating and using normal array instead of usestate is because of async behaviour during data post 
  const handleUpload = async () => {
    await handleImageUpload();
    await handleSubmitData()
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
          <FormInputs modal={modal} setModal={setModal} handleModal={handleModal} setFormData={setFormData} />

          {/* <button className='sell-preview-btn' onClick={upload}>Preview</button> */}

          <Modal setModal={setModal} modal={modal} title={'Preview'} height={'100%'} width={'100%'}>
            <Item
              show={true}
              name={formData.title}
              description={formData.description}
              price={formData.price}
              date={0}
              image={previewSource}
              category={formData.category}
              userImage={user.photoUrl}
              userName={user.name}
              wishlistData={() => { }}
              sendToast={() => { }}
              productId={'p._id'}
            />
            <button className='sell-preview-btn' style={{ fontSize: "1.2rem" }} onClick={handleUpload}>Post</button>
          </Modal>

        </div>
      </div>
      <div className="fake-container-sell-2"></div>
    </div>
  );
}
