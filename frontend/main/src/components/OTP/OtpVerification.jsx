import React, { useState } from "react";
import "./otpVerification.css";
import OTPInput from "otp-input-react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Phoone Auth
import { auth } from "../../config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";

export default function OtpVerification() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [footerBtnType, setFooterBtnType] = useState("Send OTP");
  const [otpMessage, setOtpMessage] = useState({ msg: "", success: true });

  const handleOtpChange = (digit) => {
    setOtp(digit);
  };

  const handleSendOtpBtn = () => {
    if (!loading) {
      console.log(phoneNumber);
      if (phoneNumber.toString().length !== 12) {
        setOtpMessage({ msg: "Invalid phone number", success: false });
      } else {
        setFooterBtnType("Submit");
        onSignup();
      }
    }
  };

  const handleOtpSubmit = () => {
    if (!loading) {
      if (otp.length !== 6) {
        setOtpMessage({ msg: "Invalid OTP", success: false });
      } else {
        onOTPVerify();
      }
    }
  };

  // Phone Auth

  const [loading, setLoading] = useState(false);

  function onCaptchVerify() {
    try {
      
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
    } catch (error) {
      toast.success(`${error}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phoneNumber;

    setOtpMessage({ msg: "Sending OTP...", success: true });

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setOtpMessage({ msg: "OTP sent successfully", success: true });
      })
      .catch((error) => {
        console.log(error);
        setOtpMessage({ msg: "Unable to send OTP", success: false });
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setOtpMessage({ msg: "Phone number verified.", success: true });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setOtpMessage({ msg: "Invalid OTP.", success: false });
        setLoading(false);
      });
  }

  return (
    <div className="phone-validation-outer-wrapper">
      <div className="phone-validation-container">
        <div className="phone-validation-heading">
          {footerBtnType === "Send OTP"
            ? "Enter phone number to continue!"
            : "Enter OTP"}
        </div>

        <div
          className="phone-validation-general-msg"
          style={{ display: footerBtnType === "Send OTP" ? "block" : "none" }}
        >
          Add your phone number. We'll send you a verification code so we know
          you're real.
        </div>

        <div className="phone-validation-phonenumber-container">
          {footerBtnType === "Send OTP" ? (
            <PhoneInput
              className="phone-validation-phonenumber-input"
              country={"in"}
              onChange={(value) => setPhoneNumber(value)}
            />
          ) : (
            <OTPInput
              className="phone-validation-otp-input-field"
              value={otp}
              onChange={handleOtpChange}
              OTPLength={6}
              otpType="number"
              disabled={false}
            />
          )}
        </div>

        <div className="captcha-container" id="recaptcha-container"></div>

        <div
          className="phone-validation-status-msg"
          style={{ color: otpMessage.success ? "green" : "red" }}
        >
          {otpMessage.msg}
        </div>

        <div className="phone-validation-buttons-container">
          <span
            style={{ display: footerBtnType === "Send OTP" ? "none" : "block" }}
            onClick={() => {
              setFooterBtnType("Send OTP");
              setOtpMessage({ msg: "" });
              setOtp("");
            }}
            className="phone-validation-backBtn"
          >
            Back
          </span>

          <span
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
            className="phone-validation-sendOtpBtn"
            onClick={
              footerBtnType === "Send OTP" ? handleSendOtpBtn : handleOtpSubmit
            }
          >
            {footerBtnType}
          </span>
        </div>

        <div className="phone-validation-footer-msg">
          By providing my phone number, I agree to the{" "}
          <span>Terms & conditions</span> of the website.
        </div>
      </div>
    </div>
  );
}
