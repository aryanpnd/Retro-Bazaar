import React, { useState } from 'react'
import { DeleteFilled, FileImageOutlined } from '@ant-design/icons'
import './styles/imageUpload.css'
import axios from 'axios';

export default function ImageUpload({ num ,setImage, image}) {
    const [thisImage, setThisImage] = useState(null)
    const [previewSource, setPreviewSource] = useState(null);


    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setImage([...image,e.target.files[0]])
        setThisImage(e.target.files[0])
        previewFile(file);
    };

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

    const deleteImage = () => {
        setPreviewSource(null)
        document.getElementById(`preview-upload-input-${num}`).value = null
        const imageIndex = image.indexOf(thisImage)
        const fakeArray = image
        fakeArray.splice(imageIndex,1)
        setImage(fakeArray)
    }

    return (
        <div style={{display:''}} className='sell-image-box'>
            <label className='preview-upload-label' htmlFor={`preview-upload-input-${num}`}>

                <img style={{ display: previewSource ? '' : 'none' }}
                    className='preview-upload-label-img' src={previewSource}
                    alt="" />

                <div style={{
                    display: previewSource ? 'none' : 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <FileImageOutlined />
                    <span style={{ textAlign: 'center' }}>Click to upload images</span>
                </div>
            </label>
            <input style={{ display: 'none' }} className='upload-image-box' type="file" name="" id={`preview-upload-input-${num}`} onChange={handleFileInputChange} accept='.jpeg, .jpg, .png'/>

            <button className='image-delete-btn' style={{ display: previewSource ? '' : 'none' }} onClick={deleteImage}> <DeleteFilled /> Delete</button>

        </div>
    )
}
