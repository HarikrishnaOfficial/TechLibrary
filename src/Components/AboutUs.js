import React from 'react';
import "../Styles/AboutUs.css"
import SurveyForm from './SurveyForm';
import Navbar from './Navbar';

function AboutUs() {
  return (
    <>
      <Navbar/>
      <div className="about-us-container">
        <div className="about-us-content">
          <h2 className="about-us-heading">About Our Company</h2>
          <p className="about-us-description">
            Welcome to Hey Tech! We are passionate about providing information about the details of technologies.
          </p>
          <p className="about-us-description">
            Our journey began in 2024. Since then, we've been committed to give details of technologies.
          </p>
          <p className="about-us-description">
            We strive to Add technologies, filetr technologies .
          </p>
        </div>
        <div>
          <SurveyForm />
        </div>
      </div>

    </>
  );
};

export default AboutUs;
