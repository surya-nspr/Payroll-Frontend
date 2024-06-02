import React from 'react';
import './Footer.css'; // Import CSS file for styling

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <p>&copy; 2024 Payroll Management. All rights reserved.</p>
                    </div>
                    <div className='col-md-6 text-right'>
                        <p>Contact Us: payrollmanagement@gmail.com</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
