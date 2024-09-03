import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { validateFormData } from '../utils/validateFormData';
import '../Styles/StoryUpdateModal.css';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const StoryUpdateModal = ({ isOpen, onRequestClose, story, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    author: '',
    num_comments: '',
    points: '',
    postedOn: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title,
        url: story.url,
        author: story.author,
        num_comments: story.num_comments,
        points: story.points,
        postedOn: story.postedOn || formatDate(new Date())
      });
    }
  }, [story]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const validate = () => {
    const tempErrors = validateFormData(formData);
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedStory = { ...formData, id: story.id };
      onUpdate(updatedStory);
    }
  };

  const handleCancel = () => {
    onRequestClose();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Story"
      className="modal"
      overlayClassName="modalOverlay"
    >
      <h2>Update Story</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="form-label">Title: </label>
          {errors.title && <span className="error-message">{errors.title}</span>}
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor="url" className="form-label">URL: </label>
          {errors.url && <span className="error-message">{errors.url}</span>}
          <input
            id="url"
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className={`form-input ${errors.url ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor="author" className="form-label">Author: </label>
          {errors.author && <span className="error-message">{errors.author}</span>}
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`form-input ${errors.author ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor="num_comments" className="form-label">Comments: </label>
          {errors.num_comments && <span className="error-message">{errors.num_comments}</span>}
          <input
            id="num_comments"
            type="text"
            name="num_comments"
            value={formData.num_comments}
            onChange={handleChange}
            className={`form-input ${errors.num_comments ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor="points" className="form-label">Points: </label>
          {errors.points && <span className="error-message">{errors.points}</span>}
          <input
            id="points"
            type="text"
            name="points"
            value={formData.points}
            onChange={handleChange}
            className={`form-input ${errors.points ? 'error' : ''}`}
          />
        </div>
        <div>
          <label htmlFor="postedOn" className="form-label">Posted On: </label>
          <input
            id="postedOn"
            type="date"
            name="postedOn"
            value={formData.postedOn}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button type="submit" className="submit-button">Save</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default StoryUpdateModal;
