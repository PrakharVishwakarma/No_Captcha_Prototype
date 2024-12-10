import React from "react";


const Loader = ({ showLoader }) => {
    return (
        showLoader && (
            <div
                id="loaderContainer"
                className="loaderContainer"
                style={{
                    height: "5rem",
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div className="loader"></div>
                <div>Passively Verifying User using AI</div>
            </div>
        )
    );
};

export default Loader;
