import React, { useState } from 'react';
import "../Styles/AddStoryForm.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/FormatDate';
import { validateFormData } from '../utils/validateFormData';
import Navbar from './Navbar';

function AddStoryForm() {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    author: '',
    num_comments: '',
    points: '',
    postedOn: ''
  });

  const formReset = {
    title: '',
    url: '',
    author: '',
    num_comments: '',
    points: '',
    postedOn: ''
  };

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = validateFormData(formData);
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const currentDate = formatDate(new Date());
      const updatedFormData = { ...formData, postedOn: currentDate };

      console.log("Form data is valid:", updatedFormData);
      axios.post("http://localhost:8000/stories", updatedFormData).then((response) => {
        alert("New Story is Added");
        console.log("Added story", response);
        setFormData(formReset);
        navigate("/home");
      });
    }
  };

  function handleCancel() {
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/home");
    }
  }

  return (
    <>
    <Navbar/>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <h2>Add New Story</h2>
        </div>
        <div>
          <label htmlFor='title' className="form-label">Title: </label>
          {errors.title && <span className="error-message">{errors.title}</span>}
          <input
            id='title'
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor='url' className="form-label">URL: </label>
          {errors.url && <span className="error-message">{errors.url}</span>}
          <input
            id='url'
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className={`form-input ${errors.url ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor='author' className="form-label">Author: </label>
          {errors.author && <span className="error-message">{errors.author}</span>}
          <input
            id='author'
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`form-input ${errors.author ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor='num_comments' className="form-label">Comments: </label>
          {errors.num_comments && <span className="error-message">{errors.num_comments}</span>}
          <input
            id='num_comments'
            type="text"
            name="num_comments"
            value={formData.num_comments}
            onChange={handleChange}
            className={`form-input ${errors.num_comments ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor='points' className="form-label">Points: </label>
          {errors.points && <span className="error-message">{errors.points}</span>}
          <input
            id='points'
            type="text"
            name="points"
            value={formData.points}
            onChange={handleChange}
            className={`form-input ${errors.points ? 'error' : ''}`}
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
        <button type="button" onClick={handleCancel} className="cancle-button">
          Cancel
        </button>
      </form>
    </>
  );
}

export default AddStoryForm;
