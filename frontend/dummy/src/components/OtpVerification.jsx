import React, { useState } from 'react'
import "../styles/otpVerification.css"
import OTPInput from "otp-input-react";

// Phoone Auth
import { auth } from "../config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function OtpVerification() {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("")
    const [footerBtnType, setFooterBtnType] = useState('Send OTP')
    const [otpMessage, setOtpMessage] = useState({msg:"", success:true})

    const handleOtpChange = (digit) => {
        setOtp(digit)
    }

    const handleSendOtpBtn = () => {
        if(!loading){
            console.log(phoneNumber)
            if(phoneNumber.toString().length !== 10){
                setOtpMessage({msg:"Invalid phone number", success:false})
            } else{
                // setOtpMessage({msg:"OTP sent successfully", success:true})
                setFooterBtnType("Submit")
                onSignup();
            }
        }
        
    }

    const handleOtpSubmit = () => {
        if(!loading){
            if(otp.length!==6){
                setOtpMessage({msg:"Invalid OTP", success:false})
            } else {
                onOTPVerify();
            }
        }
        
    }



    // Phone Auth

    const [loading,setLoading] = useState(false);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
      }

      function onSignup() {
        setLoading(true);
        onCaptchVerify();
    
        const appVerifier = window.recaptchaVerifier;
    
        const formatPh = "+91" + phoneNumber;

        
        setOtpMessage({msg:"Sending OTP...", success:true})

        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            // setShowOTP(true);
            // toast.success("OTP sended successfully!");
            setOtpMessage({msg:"OTP sent successfully", success:true})
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }

      function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
            // console.log(res);
            setOtpMessage({msg:"Phone number verified.", success:true})
            // setUser(res.user);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setOtpMessage({msg:"Invalid OTP.", success:false})
            setLoading(false);
          });
      }

  return (
    <div className="otp-modal-wrapper">
        <div className='otp-modal-container'>
            <div className='otp-heading'>
                {footerBtnType==="Send OTP"?"Add your phone number to continue":"Enter OTP"}
            </div>
            <div className="number-input-field-conatiner">
            
                {footerBtnType==="Send OTP"
                ? <input autoFocus type="number" className='tel-Input-for-otp' onChange={(e)=> setPhoneNumber(e.target.value)}/>
                // <OTPInput className='number-input-field' value={phoneNumber} onChange={handlePhoneChange} autoFocus OTPLength={10} otpType="number" disabled={false} />
                :<OTPInput className='number-input-field' value={otp} onChange={handleOtpChange} autoFocus OTPLength={6} otpType="number" disabled={false} />}
            </div>

            <div className="captcha-container" id='recaptcha-container'>
                
            </div>

            <div className='otp-footer'>
                <span className='otp-message'
                    style={{color:otpMessage.success?'green':'red'}}
                >
                    {otpMessage.msg}
                </span>

                <span className='otp-back-btn' 
                  style={{display:footerBtnType==="Send OTP"?"none":"block"}}
                  onClick={()=>{setFooterBtnType("Send OTP"); setOtpMessage({msg:""})}}
                >
                    Back
                </span>

                <span className='send-otp-btn'
                  onClick={
                    footerBtnType==="Send OTP"?handleSendOtpBtn:handleOtpSubmit}
                    style={{cursor:loading?'not-allowed':'pointer'}}
                >
                    {footerBtnType}
                </span>
                
            </div>
        </div>
    </div>
  )
}
