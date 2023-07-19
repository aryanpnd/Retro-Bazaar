import React, { useContext, useState } from 'react';
import './loginModal.css';
import googleLogo from '../../../assets/img/googleLogo.svg'
import { CloseOutlined, LoginOutlined, } from '@ant-design/icons'

const LoginModal = ({ modal, setModal }) => {

  const closeModal = () => {
    setModal(false)
  };

  return (
    <>
      {modal && (
        <div className={`${modal ? 'l-modal-open' : ''} l-modal`}>


          <div className="l-modal-content scaleBigAnim" >
            <div className='l-modal-head'>
              <button className='closeModal' style={{ opacity: 0 }}><CloseOutlined style={{ color: 'white', fontSize: '2rem', fontWeight: 'bolder' }} /></button>
              <div>Login</div>
              <button className='closeModal' onClick={closeModal}><CloseOutlined style={{ color: 'white', fontSize: '2rem', fontWeight: 'bolder' }} /></button>
            </div>

            <div className='l-modal-body'>
              <span style={{ textAlign: "center", fontWeight: "100" }}>You have to Login first before continue with this feature</span>
              <button style={{ background: "black", color: 'white' }} onClick={()=>window.location.href='/auth'}>Go to Login <LoginOutlined /></button>

              <button style={{ display:"flex",justifyContent:"center",background: "white", color: 'black',gap:'5px' }} onClick={()=>window.location.href='/authapi/google'}>
                <div className='google-btn-div'>Continue with google</div> 
                <div className='google-btn-div'><img draggable={false} style={{ width: '2rem' }} src={googleLogo} alt="" /></div>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
