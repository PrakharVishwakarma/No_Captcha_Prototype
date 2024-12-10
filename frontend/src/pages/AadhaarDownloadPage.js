import React from "react";
// import Navbar from '../components/Navbar';
import Navbar2 from "../components/Navbar2";

import AadhaarLogInForm from "../components/AadhaarLogInForm";
import BehaviorTracker from "../components/BehaviorTracker";

const AadhaarDownloadPage = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <Navbar2 />
            <div className="container">
                <h2 style={{ color: "darkblue" }}>Login to Aadhar via OTP</h2>

                <AadhaarLogInForm />

                <BehaviorTracker />
            </div>
        </div>
    );
};

export default AadhaarDownloadPage;
