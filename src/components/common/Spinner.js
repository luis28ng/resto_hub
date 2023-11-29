import React from 'react';
import './Spinner.css'; // Make sure to import the CSS file

const Spinner = () => {
    return (
        <div className="atom-spinner">
            <div className="spinner-inner">
                <div className="spinner-line"></div>
                <div className="spinner-line"></div>
                <div className="spinner-line"></div>
                {/* Chrome renders little circles malformed :( */}
                <div className="spinner-circle">
                    &#9679;
                </div>
            </div>
        </div>
    );
};

export default Spinner;
