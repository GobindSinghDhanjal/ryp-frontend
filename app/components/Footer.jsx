// Footer.js

import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Rate Your Professor</h3>
          <p>
            RateYourProfessor is your go-to platform for sharing and discovering
            professor reviews.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: rateyourprofessor.in@gmail.com</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Stay connected on social media:</p>
          <div className="social-icons">
            {/* Add your social media icons and links here */}
            {/* <a href="#" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a> */}
            <a href="https://www.instagram.com/rateyourprofessor/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p className="disclaimer">
          NOTICE: RateYourProfessor is a platform that provides information
          based on user-submitted content. We do not guarantee the reliability
          or accuracy of the content within this site. Users are advised to use
          this information at their own risk. It is important to note that we
          are not responsible for user-submitted ratings, comments, or errors.
          We strive to maintain the integrity of our platform, but users should
          exercise discretion when relying on the information presented here.
        </p>
        <p className="copyright">
          © {currentYear} RateYourProfessor. All Rights Reserved
        </p>
      </div>
      <hr />
      <div className="footer-bottom">
      <p className="version">Version 1.7.0</p>
      </div>

    </footer>
  );
};

export default Footer;
