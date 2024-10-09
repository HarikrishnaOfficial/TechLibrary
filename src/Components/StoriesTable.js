import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryUpdateModal from '../Models/StoryUpdateModal';
import axios from 'axios';

function StoriesTable({ stories, handleRemove, handleUpdate }) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);


  function handleUpdateClick(id) {
    const story = stories.find(story => story.id === id);
    setSelectedStory(story);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setSelectedStory(null);
  }

  const handleUpdateStory = async (updatedStory) => {
    try {
      const response = await axios.put(`http://localhost:8000/stories/${updatedStory.id}`, updatedStory);
      handleUpdate(response.data);
      alert("Story is updated successfully!");
      closeModal();
      navigate("/home");
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

  return (
    <>
      <table className="storiesTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Comments</th>
            <th>Points</th>
            <th>Posted Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stories.map(({ id, url, title, author, num_comments, points, postedOn }) => (
            <tr key={id} className='tableRow'>
              <td><a href={url} target="_blank" rel="noopener noreferrer" className='storyTitle'>{title}</a></td>
              <td className='storyAuthor'>{author}</td>
              <td className='storyComments'>{num_comments}</td>
              <td className='storyPoints'>{points}</td>
              <td className='storyPostedOn'>{postedOn}</td>
              <td>
                <button onClick={() => handleRemove(id)} className='removeButton'>Remove</button>
                <button onClick={() => handleUpdateClick(id)} className='updateButton'>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStory && (
        <StoryUpdateModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          story={selectedStory}
          onUpdate={handleUpdateStory}
        />
      )}
    </>
  );
}

export default StoriesTable;
