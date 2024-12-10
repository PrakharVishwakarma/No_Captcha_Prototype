import React, { useState, useEffect } from "react";
import AadhaarForm from "./AadhaarForm";
import OtpVerification from "./OtpVerification";
import Loader from "./Loader";
import Captcha from "./Captcha";

const AadhaarLogInForm = () => {
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [countdown, setCountdown] = useState(60);
    const [captcha, setCaptcha] = useState(false);
    // const [bot, setBot] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        setTimeout(() => {
            setShowLoader(false);
            setOtpSent(true);

            setCaptcha(true);

            // setBot(true);

        }, 4500);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        alert("OTP Submitted Successfully!");
    };

    const handleResendOtp = () => {
        setCountdown(60);
        alert("Resending OTP...");
    };

    useEffect(() => {
        let timer;
        if (otpSent && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [otpSent, countdown]);


    return (
        <div className="formContainer">
            <AadhaarForm
                aadhaarNumber={aadhaarNumber}
                setAadhaarNumber={setAadhaarNumber}
                handleSubmit={handleSubmit}
                otpSent={otpSent}
            />
            <Loader showLoader={showLoader} />

            {/* {bot && (<div style={{color:'red'}}>
                Bot Detected !!! Your Ip is Blocked, Plese Try After 60 seconds.
            </div>)} */}

            {/* <OtpVerification
                otpSent={otpSent}
                otp={otp}
                setOtp={setOtp}
                countdown={countdown}
                handleOtpSubmit={handleOtpSubmit}
                handleResendOtp={handleResendOtp}
            /> */}

            {captcha && (<Captcha 
                otpSent={otpSent}
                otp={otp}
                setOtp={setOtp}
                countdown={countdown}
                handleOtpSubmit={handleOtpSubmit}
                handleResendOtp={handleResendOtp}
            />)
            }
        </div>
    );
};

export default AadhaarLogInForm;
