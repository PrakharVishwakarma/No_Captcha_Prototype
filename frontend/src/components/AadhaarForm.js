import React from "react";

const AadhaarForm = ({ aadhaarNumber, setAadhaarNumber, handleSubmit, otpSent }) => {
    return (
        <form onSubmit={handleSubmit} className="aadhaar-form">
            <div>
                <input
                    type="text"
                    id="aadhaar"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    maxLength={12}
                    required
                    placeholder="Enter Aadhaar Number"
                />
            </div>

            {!otpSent && (
                aadhaarNumber.length === 12 ? (
                    <button className="getOtpBtn2" type="submit">
                        Login with OTP
                    </button>
                ) : (
                    <button className="getOtpBtn1" type="button" disabled>
                        Login with OTP
                    </button>
                )
            )}
        </form>
    );
};

export default AadhaarForm;
