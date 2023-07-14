import React, { useContext, useState } from 'react';
import './modal.css';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'

const Modal = ({ children, title, modal, setModal, height, width, noCloseBtn, borderR,noHead }) => {

    const closeModal = () => {
        setModal(false)
    };

    return (
        <>
            {modal && (
                <div className={` app ${modal ? 'modal-open' : ''} modal`}>


                    <div className="modal-content scaleBigAnim" style={{ height: height, width: width, borderRadius: borderR }} >
                        <div className='modal-heading' style={{display:noHead?'none':''}}>
                            {title}
                            {!noCloseBtn && <button className='closeModal' onClick={closeModal}><CloseOutlined style={{ color: 'white', fontSize: '2rem', fontWeight: 'bolder' }} /></button>}
                        </div>

                        <div className='modal-body'>
                            {children}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
