import React, { useState } from 'react';
import '../Styles/AddStoryForm.css';
import axios from 'axios';
import Navbar from './Navbar';

function ContactUs() {
  const initialFormData = {
    userName: '',
    email: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!formData.userName) {
      tempErrors.userName = 'User Name is required.';
    }

    if (!formData.email) {
      tempErrors.email = 'Email is required.';
    } else if (!isValidEmail(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message) {
      tempErrors.message = 'Message is required.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          'https://formspree.io/f/xrbzbeao',
          formData
        );

        if (response.status === 200) {
          alert('Form submitted successfully');
          setFormData(initialFormData);
        } else {
          alert('Something went wrong, try again');
          console.error('Form submission failed');
        }
      } catch (error) {
        alert('Something went wrong, try again');
        console.error('Form submission failed:', error);
      }
    }
  };

  return (
    <>
      <Navbar/>
      <form onSubmit={handleSubmit} className="form-container">
      <div>
          <h2>Contact Us</h2>
        </div>
        <div>
          <label htmlFor="userName" className="form-label">Name: </label>
          {errors.userName && <span className="error-message">{errors.userName}</span>}
          <input
            id="userName"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className={`form-input ${errors.userName ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">Email: </label>
          {errors.email && <span className="error-message">{errors.email}</span>}
          <input
            id="email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor="message" className="form-label">Message: </label>
          {errors.message && <span className="error-message">{errors.message}</span>}
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`form-input ${errors.message ? 'error' : ''}`}
            rows={4}
          />
        </div>
        <button type="submit" className="submit-button">
          Post
        </button>
      </form>
    </>
  );
};

export default ContactUs;
