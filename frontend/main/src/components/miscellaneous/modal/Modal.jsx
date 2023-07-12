import React, { useContext, useState } from 'react';
import './modal.css';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'

const Modal = ({ children, title, modal, setModal, height, width }) => {

    const closeModal = () => {
        setModal(false)
    };

    return (
        <>
            {modal && (
                <div className={` app ${modal ? 'modal-open' : ''} modal`}>


                    <div className="modal-content scaleBigAnim" style={{ height: height, width: width }} >
                        <div className='modal-heading'>
                            {title}
                            <button className='closeModal' onClick={closeModal}><CloseOutlined style={{ color: 'white', fontSize: '2rem', fontWeight: 'bolder' }} /></button>
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
