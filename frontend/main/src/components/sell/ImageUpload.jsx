import React, { useState } from 'react'
import { DeleteFilled, FileImageOutlined } from '@ant-design/icons'
import './styles/imageUpload.css'

export default function ImageUpload({ num }) {
    const [previewSource, setPreviewSource] = useState(null);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
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
    }

    return (
        <div className='sell-image-box'>
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
            <input style={{ display: 'none' }} className='upload-image-box' type="file" name="" id={`preview-upload-input-${num}`} onChange={handleFileInputChange} />

            <button className='image-delete-btn' style={{ display: previewSource ? '' : 'none' }} onClick={deleteImage}> <DeleteFilled /> Delete</button>

        </div>
    )
}
