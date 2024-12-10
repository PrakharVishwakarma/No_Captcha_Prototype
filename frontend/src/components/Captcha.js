import React, { useState, useEffect } from "react";
import { LeminCroppedCaptcha, LeminCroppedCaptchaContainer } from "@leminnow/react-lemin-cropped-captcha";

import OtpVerification from "./OtpVerification";

const myCaptcha = new LeminCroppedCaptcha('lemin-cropped-captcha', 'CROPPED_eef7e1a_d10babae155048bb9b2bb920914049d9')


const Captcha = ({otpSent, otp, setOtp, countdown, handleOtpSubmit, handleResendOtp }) => {

    const [value, setValue] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://api.leminnow.com/captcha/v1/cropped/CROPPED_eef7e1a_d10babae155048bb9b2bb920914049d9/js";
        script.type = 'text/javascript';
        document.getElementById('root').appendChild(script);

        return () => {
            document.getElementById('root').removeChild(script);
        };
    }, []);

    function handleCaptchaValue() {
        const values = myCaptcha.getCaptchaValue();
        console.log(values);
        setValue(values);
    }

    return (
        <div className="captchaBox">
            {!value && (<div style={{margin: '0.25rem 0rem', color:'red'}}>
                Passive Ml detection is Confused Please Enter Captcha
            </div>)}
            
            <form>
                <LeminCroppedCaptchaContainer
                    containerId={myCaptcha.containerId}
                    captchaId={myCaptcha.captchaId}/>
            </form>
            {!value && (<button onClick={handleCaptchaValue} style={{marginTop:'0.5rem'}} className="getOtpBtn1">Get OTP</button>)}
            

            {value && (<OtpVerification
                otpSent={otpSent}
                otp={otp}
                setOtp={setOtp}
                countdown={countdown}
                handleOtpSubmit={handleOtpSubmit}
                handleResendOtp={handleResendOtp}
            />)}
        </div>
    );
};

export default Captcha;
