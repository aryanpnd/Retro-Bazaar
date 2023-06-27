import React, { useState } from 'react'
import "../styles/otpVerification.css"
import OTPInput from "otp-input-react";

export default function OtpVerification() {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("")
    const [footerBtnType, setFooterBtnType] = useState('Send OTP')
    const [otpMessage, setOtpMessage] = useState({msg:"", success:true})

    const handlePhoneChange = (digit) => {
        setPhoneNumber(digit)
    }
    const handleOtpChange = (digit) => {
        setOtp(digit)
    }

    const handleSendOtpBtn = () => {
        // console.log(phoneNumber)
        if(phoneNumber.length !== 10){
            setOtpMessage({msg:"Invalid phone number", success:false})
        } else{
            setOtpMessage({msg:"OTP sent successfully", success:true})
            setFooterBtnType("Submit")
        }
    }

    const handleOtpSubmit = () => {
        if(otp.length!==4){
            setOtpMessage({msg:"Invalid OTP", success:false})
        } else if(otp==="8080"){
            setOtpMessage({msg:"Phone number verified", success:true})
        }
    }

  return (
    <div className="otp-modal-wrapper">
        <div className='otp-modal-container'>
            <div className='otp-heading'>
                {footerBtnType==="Send OTP"?"Add your phone number to continue":"Enter OTP"}
            </div>
            <div className="number-input-field-conatiner">
            
                {footerBtnType==="Send OTP"?<OTPInput className='number-input-field' value={phoneNumber} onChange={handlePhoneChange} autoFocus OTPLength={10} otpType="number" disabled={false} />
                :<OTPInput className='number-input-field' value={otp} onChange={handleOtpChange} autoFocus OTPLength={4} otpType="number" disabled={false} />}
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
                  onClick={footerBtnType==="Send OTP"?handleSendOtpBtn:handleOtpSubmit}
                >
                    {footerBtnType}
                </span>
                
            </div>
        </div>
    </div>
  )
}
