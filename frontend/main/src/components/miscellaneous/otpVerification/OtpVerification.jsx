import React, { useState } from "react";
import "./otpVerification.css";
import OTPInput from "otp-input-react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Phoone Auth
import { auth } from "../../../config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { LoadingOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { apiURL } from "../../../App";

export default function OtpVerification({ setPhoneModal, setModal }) {

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
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
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
                toast.error(`Unable to send OTP`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setOtpMessage({ msg: "Unable to send OTP", success: false });
                setLoading(false);
                return
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                axios.put(`${apiURL}/api/addUserPhone`, {
                    phonenumber: phoneNumber,
                },
                    {
                        withCredentials: true,
                    }).then((res) => {
                        setOtpMessage({ msg: "Phone number verified.", success: true });
                        setPhoneModal(false)
                        setModal(true)
                        setLoading(false);
                        toast.success(`Phone number verified`, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }).catch((err)=>{
                        setLoading(false);
                        toast.error("Something went wrong while saving the phone number", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    })
            })
            .catch((err) => {
                console.log(err);
                setOtpMessage({ msg: "Invalid OTP.", success: false });
                toast.error(`Invalid OTP`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setLoading(false);
            });
    }

    return (
        <div style={{ width: '100%', display: "flex", justifyContent: 'center' }}>
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
                    Make sure the phone number should also linked to <WhatsAppOutlined style={{ color: 'green' }} /> whatsapp to make it easier for customer to contact you.
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
                    style={{ color: otpMessage.success ? "#5cff5c" : "red" }}
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
                        {loading?<LoadingOutlined />:(<>{footerBtnType}</>)}
                    </span>
                </div>

            </div>
        </div>
    );
}
