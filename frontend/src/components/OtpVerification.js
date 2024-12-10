import React, { useState, useEffect } from "react";

const OtpVerification = ({ otpSent, otp, setOtp, countdown, handleOtpSubmit, handleResendOtp }) => {
    return (
        <>
            {otpSent && (
                <>
                    <div className="otp-sent-message" style={{ color: "green", marginTop: "1rem" }}>
                        Successfully Generated One Time Password
                    </div>
                    <div style={{ marginTop: "1rem", height:'2.5rem' }}>
                        <input
                            type="text"
                            id="otpInput"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            placeholder="Enter OTP "
                            required
                            style={{width:'100%', height:'100%', paddingLeft:'0.60rem', fontSize:'1rem'}}
                        />
                    </div>

                    {otp.length === 6 ? (
                        <button
                            className="getOtpBtn2"
                            type="button"
                            style={{ marginTop: "1rem" }}
                            onClick={handleOtpSubmit}
                        >
                            Submit Your Credentials
                        </button>
                    ) : (
                        <button
                            className="getOtpBtn1"
                            type="button"
                            style={{ marginTop: "1rem" }}
                            onClick={handleOtpSubmit}
                        >
                            Submit Your Credentials
                        </button>
                    )}

                    <div style={{ marginTop: "1rem", color: "blue" }}>
                        {countdown > 0 ? (
                            <p>Resend OTP in {countdown} seconds</p>
                        ) : (
                            <button className="resendOtpBtn" type="button" onClick={handleResendOtp}>
                                Resend OTP
                            </button>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default OtpVerification;
