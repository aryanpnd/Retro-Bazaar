import React, { useEffect, useState } from "react";
import "./styles/style.css";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import FormInputs from "./FormInputs";
import Modal from "../miscellaneous/modal/Modal";
import Item from "../miscellaneous/productCards/Item";
import { toast } from "react-toastify";
import { apiURL } from "../../App";
import Lottie from "lottie-react";
import loader from "../../assets/lottie/cart-icon-loader.json";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import OtpVerification from "../miscellaneous/otpVerification/OtpVerification";
import { InfoCircleFilled } from "@ant-design/icons";

export default function SellPage() {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false)
  const [phoneModal, setPhoneModal] = useState(false);
  const [user, setuser] = useState({ name: "", photoUrl: "" });
  const [previewSource, setPreviewSource] = useState(null);
  const [image, setImage] = useState([]);
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
    imagesPublicId: [],
  });
  let images = [];
  let imagesPublicId = [];
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [dataUploadLoading, setDataUploadLoading] = useState(false);

  // getting user data for preview card
  useEffect(() => {
    axios
      .get(`${apiURL}/api/getUserInfo`, { withCredentials: true })
      .then((res) => {
        setuser(res.data.data);
      });
  }, []);
  useEffect(() => {
    setPreviewLoading(true)
    axios
      .get(`${apiURL}/api/getUserInfo`, { withCredentials: true })
      .then((res) => {
        setuser(res.data.data);
        setPreviewLoading(false)
      });
  }, [modal]);

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
      });
      return;
    }
    user.phoneNo ? setModal(!modal) : setPhoneModal(!phoneModal)
    previewFile(image[0]);
    setPreviewLoading(false)
  };


  // preview image in modal
  const previewFile = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewSource("");
    }
  };

  // handling image upload
  const handleImageUpload = async () => {
    setImageUploadLoading(true);
    for (const img of image) {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "retroBazaarTest");
      formData.append("cloud_name", "dnoycwhjx");

      try {
        await axios
          .post(
            "https://api.cloudinary.com/v1_1/dnoycwhjx/image/upload/",
            formData,
            {
              onUploadProgress: (ProgressEvent) => {
                // console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
              },
            }
          )
          .then((res) => {
            images = [...images, res.data.secure_url];
            imagesPublicId = [...imagesPublicId, res.data.public_id];
            setImageUploadLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setImageUploadLoading(false);
            toast.error(`Some error occurred while uploading the images`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });
      } catch (error) {
        console.error(error);
        setImageUploadLoading(false);
        toast.error(`Some error occurred while uploading the images`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  // submitting data to server
  const handleSubmitData = async () => {
    setDataUploadLoading(true);
    await axios
      .post(
        `${apiURL}/api/addproduct`,
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: formData.price,
          quantity: formData.quantity,
          brand: formData.brand,
          location: formData.location,
          thumbnail: images[0],
          images: images,
          imagesPublicId: imagesPublicId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.code) {
          setDataUploadLoading(false);
          setImageUploadLoading(false)
          toast.error(`${res.data.message}`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return
        }

        setDataUploadLoading(false);
        toast.success(`${res.data}`, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setDataUploadLoading(false);
        toast.error(`Some error occurred while uploading the product`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  // doing this separating and using normal array instead of usestate is because of async behaviour during data post
  const handleUpload = async () => {
    await handleImageUpload();
    await handleSubmitData();
  };

  return (
    <div className="sell-container">
      <div className="fake-container-sell"></div>
      {!user.phoneNo &&
        <div style={{height:'min-content',textAlign:"center",background:"#d43303"}}><InfoCircleFilled/> Your phone number is not verified, you will be asked for the verification</div>
      }
      <div style={{ height: user.phoneNo ? '10%' : '8%' }} className="sell-heading">Sell a product</div>

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
          <FormInputs
            modal={modal}
            setModal={setModal}
            handleModal={handleModal}
            setFormData={setFormData}
            previewLoading={previewLoading}
          />

          <Modal
            setModal={setModal}
            modal={modal}
            title={"Preview"}
            height={"100%"}
            width={"100%"}
          >
            {
              <>
                {imageUploadLoading || dataUploadLoading ? (
                  <>
                    {
                      <>
                        <div className="lottie-loader-container">
                          <div className="lottie-loader-inner-wrapper">
                            <Lottie animationData={loader} loop={true} />
                            <h2 style={{ textAlign: "center" }}>
                              {imageUploadLoading
                                ? "Uploading images..."
                                : "Uploading your product..."}
                            </h2>
                          </div>
                        </div>
                      </>
                    }
                  </>
                ) : (
                  <Item
                    show={true}
                    name={formData.title}
                    description={formData.description}
                    price={formData.price}
                    date={0}
                    location={formData.location}
                    image={previewSource}
                    category={formData.category}
                    userImage={user.photoUrl}
                    userName={user.name}
                    wishlistData={() => { }}
                    sendToast={() => { }}
                    productId={"p._id"}
                  />
                )}
                <button
                  className="sell-preview-btn"
                  style={{ fontSize: "1.2rem", opacity: imageUploadLoading || dataUploadLoading ? "0.4" : "1", }}
                  onClick={handleUpload}
                >
                  {imageUploadLoading || dataUploadLoading ? (
                    <BeatLoader color="white" size={10} />
                  ) : ("Post")
                  }
                </button>
              </>
            }
          </Modal>
        </div>

        {/* phone modal */}
        <Modal setModal={setPhoneModal}
          modal={phoneModal}
          title={"Verify phone"}
          height={"100%"}
          width={"100%"}>
          <OtpVerification setModal={setModal} setPhoneModal={setPhoneModal} setuser={setuser} />
        </Modal>

      </div>
      <div className="fake-container-sell-2"></div>
    </div>
  );
}
